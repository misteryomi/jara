import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

export default class VideoPlayer extends PureComponent {
    state = {
        videoPaused: false,
    }

    videoError = (err) => {
        console.warn(err)
    }

    playVideo = () => {
        this.player && this.player.seek(0);
        this.setState({videoPaused: false});
    }
    render() {
        return (
            <View style={{flex: 1}}>
                {this.state.videoPaused && (
                    <View style={styles.playButtonContainer}>
                        <TouchableOpacity
                        style={styles.playButton}
                        onPress={() => {
                            this.playVideo();
                        }}>
                            <Icon name="ios-play" size={60} color="#fff" />
                        </TouchableOpacity>

                    </View>
                )}

                <Video source={{ uri: this.props.media }}   // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref
                    }}                                      // Store reference
                    onBuffer={(buff) => console.warn(buff)}                // Callback when remote video is buffering
                    onError={this.videoError}               // Callback when video cannot be loaded
                    style={styles.backgroundVideo} 
                    paused={this.state.videoPaused}    // This is ``falsy`` initially
                    repeat={false}     
                    onEnd={() => this.setState({videoPaused: true})}    
                />

            </View>
         
        )
    }    
}

const styles = StyleSheet.create({
    backgroundVideo: {
     width: '100%',
     height: '100%',
     backgroundColor: '#000'
    },
    playButtonContainer: {
        position: 'absolute',
        zIndex: 2,
        top: 0,
        left: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    playButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        paddingLeft: 25,
        width: 100,
        height: 100,
        alignItems: 'center',
        borderRadius: 50
    },
  });