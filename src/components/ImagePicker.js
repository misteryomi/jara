import React from 'react';
import { Text, Image, View, Modal, StyleSheet, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CameraScreen from './CameraScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';

//Image picker
const options = {
  // title: 'Select Avatar',
  // storageOptions: {
  //   skipBackup: true,
  //   path: 'images',
  // },
  // chooseFromLibraryButtonTitle: 'Pick image',
  mediaType: 'photo'
};

const videoOptions = {
  // title: 'Select Avatar',
  // storageOptions: {
  //   skipBackup: true,
  //   path: 'images',
  // },
  // chooseFromLibraryButtonTitle: 'Pick image',
  videoQuality: 'medium',
  durationLimit: 320,
  mediaType: 'video'
};


export default class ImgPicker extends React.PureComponent  {

  constructor(props) {
    super(props);

    this.state = {
      pictureSource: [],
      videoSource: [],
      cameraModal: false,
      maxPictures: 4,
      maxVideos: 1,
    }

    this.player = React.createRef();
  }

  componentWillUnmount() {
    this.setState({ cameraModal: false })
  }

  handleUpdateMedia = (source) => {
    const { pictureSource } = this.state;

    let newpictureSource = [source, ...pictureSource];

    this.setState({ pictureSource: newpictureSource });
    this.props.mediaFiles(newpictureSource);
  }

  handleUpdateVideoMedia = (source) => {
    const { videoSource } = this.state;

    let newVideoSource = [source, ...videoSource];

    this.setState({ videoSource: newVideoSource });
    this.props.videoFiles(newVideoSource);
  }

  handleRemoveMedia = (index) => {
    const { pictureSource } = this.state;

    pictureSource.splice(index, 1);

    this.setState({ pictureSource });
    this.props.mediaFiles(pictureSource);
  }


  handleSnappedMedia = ({uri}) => {

      this.handleUpdateMedia({ uri });
  }
  

  closePickerModal = () => {
    this.setState({cameraModal:false});
  }

  handleShowPicker = () => {
    launchImageLibrary(options, (response) => {
        // console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        } else {
  //        const source = { uri: response.uri }; //.uri
          this.handleSnappedMedia(response)
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
         }
      });
      
    }

    handleShowVideoPicker = () => {
      launchImageLibrary(videoOptions, (response) => {
        
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            // console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            // console.log('User tapped custom button: ', response.customButton);
          } else {
            this.handleUpdateVideoMedia({uri: response.uri})
           }
        });
        
      }


    render() {
      const { pictureSource, videoSource, maxPictures } = this.state;

      console.log({pictureSource, videoSource});
        return (
          <View style={{marginVertical: 10}}>

            <ScrollView styles={styles.mediaContainer} horizontal>
              {pictureSource.length < maxPictures && (
              <TouchableOpacity onPress={() => this.setState({cameraModal: true})} style={[styles.attachMedia, styles.imageBox]}>
                <Icon name="image-plus" size={35} color="#fff" />
              </TouchableOpacity>
              )}
 
                {this.state.pictureSource.map((item, index) => (
                  <View style={styles.imageBox} key={index}>
                    <Image source={item} style={styles.media} />
                    <TouchableOpacity onPress={() => this.handleRemoveMedia(index)} style={styles.removeMedia}>
                      <Icon name="cancel" size={12} color="#fff" />
                    </TouchableOpacity>
                  </View>  
                ))}



            </ScrollView>

                {/* {this.state.videoSource.map((item, index) => (
                  <View key={index} style={{padding: 20, minHeight: 200, width: '100%', flex: 1, justifyContent: 'center', alignItems:'center'}}>
                    <Video source={item}   // Can be a URL or a local file.
                          ref={(ref) => {
                            this.player = ref
                          }}                                      // Store reference
                          // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                          // onError={this.videoError}               // Callback when video cannot be loaded
                          style={styles.backgroundVideo}
                          // controls={true}
                          repeat={true}
                          // onEnd={() => this.player.play()}
                          />
                  </View>
                ))} */}

              <TouchableOpacity style={{padding: 20, margin: 20}} onPress={() => this.handleShowPicker()}>
                <Text>Add Picture</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity style={{padding: 20, margin: 20}} onPress={() => this.handleShowVideoPicker()}>
                <Text>Add Video</Text>
              </TouchableOpacity> */}


          </View>

        )
    }
      
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  innerContainer: {
    alignItems: 'center',
  },
  mediaContainer: {
    flexDirection: 'row'
  },
  attachMedia: {
    // backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBox: {
    position: 'relative',
    width: 80,
    height: 80,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden"
  },
  media: {
    width: 100, 
    height: 100,
  },
  removeMedia: {
    position: 'absolute',
    top: -4,
    right: -4,
    zIndex: 40,
    // backgroundColor: primaryColor,
    padding: 2,
  },
  backgroundVideo: {
    backgroundColor: 'black',
    flex: 1,
    width: '100%',
    height: 300,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
});