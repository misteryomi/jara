import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import VideoPlayer from './VideoPlayer';
import Icon from 'react-native-vector-icons/Ionicons';

const Preview = (props) => {
    return (
        <Modal
          animationType="fade"
          transparent={false}
          visible={props.displayPreview}
          onRequestClose={() => props.hidePreview()}

         >
          <View style={{flex: 1, backgroundColor: '#000'}}>
            <TouchableOpacity
                style={styles.goToBackBtn}
                onPress={() => {
                props.hidePreview();
            }}>
                <Icon name="ios-arrow-round-back" size={50} color="#fff" />
            </TouchableOpacity>


              {props.type === 'picture' ?              
                <Image
                    source={{
                        isStatic: true,
                        uri: props.media,
                    }}
                    style={{height: "100%", width:"100%", resizeMode: 'contain'}}
                />               
                :
                <VideoPlayer media={props.media} />
              }

            <View style={styles.continueBtnContainer}>
                <TouchableOpacity
                    style={styles.continueBtn}
                    onPress={() => {
                    props.attachMedia();
                }}>
                    <Icon name="md-checkmark" color="#fff" size={40} />
                </TouchableOpacity>                
            </View>
          </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    goToBackBtn: {
        position: 'absolute',
        top: 10,
        left: 20,
        zIndex: 3
    },    
    continueBtnContainer: {
        position: 'absolute',
        bottom: 70,
        left: 0,
        zIndex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    continueBtn: {
        backgroundColor: '#20c12d',
        padding: 15,
        paddingLeft: 15,
        width: 70,
        height: 70,
        alignItems: 'center',
        borderRadius: 50,
    }
})

export default Preview;