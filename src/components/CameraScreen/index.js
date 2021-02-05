/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import PinchGesture from './PinchGesture';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Preview from './Preview';
import ImagePicker from 'react-native-image-picker';

//Image picker
const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  chooseFromLibraryButtonTitle: 'Pick image',
};



const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

const landmarkSize = 2;

export default class CameraScreen extends PureComponent {

 
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    autoFocusPoint: {
      normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
      drawRectPosition: {
        x: Dimensions.get('window').width * 0.5 - 32,
        y: Dimensions.get('window').height * 0.5 - 32,
      },
    },
    depth: 0,
    type: 'front',
    whiteBalance: 'auto',
    ratio: '16:9',
    recordOptions: {
      mute: false,
      maxDuration: 15,
      quality: RNCamera.Constants.VideoQuality['288p'],
    },
    isRecording: false,
    canDetectFaces: false,
    canDetectText: false,
    canDetectBarcode: false,
    faces: [],
    textBlocks: [],
    barcodes: [],
    displayPreview: false,
    mediaFile: '',
    mediaType: 'picture',
    pickerModalVisible: false,
  };

  componentWillUnmount() {
        this.setState({displayPreview: false})
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  touchToFocus(event) {
    const { pageX, pageY } = event.nativeEvent;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const isPortrait = screenHeight > screenWidth;

    let x = pageX / screenWidth;
    let y = pageY / screenHeight;
    // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
    if (isPortrait) {
      x = pageY / screenHeight;
      y = -(pageX / screenWidth) + 1;
    }

    this.setState({
      autoFocusPoint: {
        normalized: { x, y },
        drawRectPosition: { x: pageX, y: pageY },
      },
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  setFocusDepth(depth) {
    this.setState({
      depth,
    });
  }

  takePicture = async function() {
    if (this.camera) {
      const data = await this.camera.takePictureAsync();

      this.setState({mediaFile: data.uri, displayPreview: true, mediaType: 'picture'});
//     console.warn('takePicture ', data);
    }
  };

  takeVideo = async function() {
    if (this.camera) {
      try {
        const promise = this.camera.recordAsync(this.state.recordOptions);

        if (promise) {
          this.setState({ isRecording: true });
          const data = await promise;
          this.setState({ isRecording: false, mediaFile: data.uri, displayPreview: true, mediaType: 'video'});

//          console.warn('takeVideo', data);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  stopRecording = () => {
    this.camera.stopRecording();
    this.setState({ isRecording: false });
  }

  toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));


  renderFlashType = () => {
    var name;

    switch (this.state.flash) {
      case 'torch':
        name = 'flash';
        break;
        
       case 'off':
        name = 'flash-off';
        break;
    
      default:
        name = 'flash-auto';
        break;
    }

    return  <Text>Flip</Text>//<Icon size={30} name={name} color="white" style={styles.flipIcon} />
  }


  onPinchGestureEvent = ({ nativeEvent }) => {
//    console.log(nativeEvent);
    if (!nativeEvent || nativeEvent.state !== State.ACTIVE) {
        return;
    }

    if (nativeEvent.scale > this.prevZoomScale) {
        this.setState({ zoom: Math.min(0.05, this.state.zoom + this.zoomRate) });
        this.zoomOut.bind(this)
    } else {
//        this.setState({ zoom: Math.max(0, this.state.zoom - (this.zoomRate + this.zoomRate / 2)) });
        this.zoomIn.bind(this)
    }

    this.prevZoomScale = nativeEvent.scale;
}

handleShowPicker = () => {
  ImagePicker.launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
//        const source = { uri: response.uri }; //.uri
        this.props.onSnapMedia(response.uri, response.data)
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        
       }
    });
    
  }



  renderCamera() {
    const { canDetectFaces, canDetectText, canDetectBarcode, displayPreview } = this.state;

    const drawFocusRingPosition = {
      top: this.state.autoFocusPoint.drawRectPosition.y - 32,
      left: this.state.autoFocusPoint.drawRectPosition.x - 32,
    };
    return (
      <PinchGesture
          onPinchGestureEvent={this.onPinchGestureEvent.bind(this)}
      > 
      <View style={{flex: 1}}>
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        >
        <View style={StyleSheet.absoluteFill}>
          <View style={[styles.autoFocusBox, drawFocusRingPosition]} />
          <TouchableWithoutFeedback onPress={this.touchToFocus.bind(this)}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        </View>
        <TouchableOpacity onPress={() => this.props.onCancel()} style={{ marginLeft: 20}}>
            <Ionicon name="ios-arrow-round-back" size={50} color="#fff" />
        </TouchableOpacity>

        <View style={{ bottom: 0 }}>
          <View
            style={{
              height: 20,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}
          >
          </View>
          <View
            style={styles.controls}
          >
            <TouchableOpacity style={[styles.flipButton, { justifyContent: 'flex-start' }]} onPress={() => this.handleShowPicker()}>
              <EIcon name="images" size={30} style={styles.flipIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.flipButton} onPress={this.toggleWB.bind(this)}>
              <Text style={[styles.flipText, { width: 30, fontSize: 30, color: '#fff'}]}> {this.state.whiteBalance.charAt(0).toUpperCase()} </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.flipButton,
                styles.recordButton,
                {
                  backgroundColor: this.state.isRecording ? 'darkred' : 'transparent',
                },
              ]}
              onPress={this.takePicture.bind(this)}
              onLongPress={this.state.isRecording ? () => {} : this.takeVideo.bind(this)}
              onPressOut={this.stopRecording}
            >
                <Text style={styles.flipText}>  </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
              <Text style={styles.flipText}> 
                 <Icon size={40} name="refresh" color="white" style={styles.flipIcon} />
               </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
              {this.renderFlashType()} 
            </TouchableOpacity>
          </View>
          {/* {this.state.zoom !== 0 && (
            <Text style={[styles.flipText, styles.zoomText]}>Zoom: {this.state.zoom}</Text>
          )}
          <View
            style={{
              height: 56,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}
          >
            <TouchableOpacity
              style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
              onPress={this.zoomIn.bind(this)}
            >
              <Text style={styles.flipText}> + </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
              onPress={this.zoomOut.bind(this)}
            >
              <Text style={styles.flipText}> - </Text>
            </TouchableOpacity>
          </View>        */}
        </View>
      </RNCamera>
            <Preview 
                displayPreview={displayPreview} 
                hidePreview={() => this.setState({displayPreview: false})} 
                media={this.state.mediaFile} 
                type={this.state.mediaType} 
                attachMedia={() => this.props.onSnapMedia(this.state.mediaFile)}
                />
        </View>
      </PinchGesture>        
    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  flipButton: {
    // flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    // borderRadius: 8,
    // borderColor: 'white',
    // borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoFocusBox: {
    position: 'absolute',
    height: 64,
    width: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    opacity: 0.4,
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  flipIcon: {
    width: 30, 
    textAlign: 'center',
    color: '#fff'
  },
  controls: {
    height: 56,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignSelf: 'center',
    marginBottom: 50
  },
  recordButton: {
    borderRadius: 50,
    width: 100,
    height: 100,
    marginTop: -30,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 2
  },
});