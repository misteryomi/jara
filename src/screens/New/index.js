import React from 'react';
import { Card, Divider, Icon, Button, Input, TopNavigation } from '@ui-kitten/components';
import { Text, StyleSheet } from 'react-native';
import {actions, getContentCSS, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import { BaseLayout } from '../../components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImgPicker from '../../components/ImagePicker'

export default () => {
    let richtext = React.createRef()  || useRef();
    // linkModal = React.createRef();
    


    return (
        <BaseLayout style={{padding: 20, backgroundColor: 'red'}}>            
            <TopNavigation title='Add a New Topic' alignment='center'/>
            <Divider/>
            <Input
                style={styles.input}
                size='large'
                placeholder='Title'
                // {...largeInputState}
            />        
            <RichToolbar
                handle         
                getEditor={() => richtext}
                actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                ]}                
            />            
            <RichEditor
                ref={(r) => richtext = r}
                placeholder="Add details (optional)"
                style={{height: 104}}
                
                // initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
                // editorInitializedCallback={() => this.onEditorInitialized()}
            />    

            <Card>
                <Text>Hello</Text>
                <ImgPicker mediaFiles={(mediaFiles) => console.log({mediaFiles})} videoFiles={(files) => console.log({files})}/>

                {/* <Button
                    onPress={() =>
                        launchImageLibrary(
                        {
                            mediaType: 'photo',
                            includeBase64: false,
                            maxHeight: 200,
                            maxWidth: 200,
                        },
                        (response) => {
                            console.log({response})
                            // setResponse(response);
                        },
                        )
                    }
                    >Select image</Button>

                    <Button
                
                    onPress={() =>
                        launchImageLibrary({mediaType: 'video'}, (response) => {
                        console.log({response});
                        })
                    }
                    >Select video</Button> */}
            </Card>
            <Button  status='danger'>Publish</Button>
        </BaseLayout>
    )
}


const styles = StyleSheet.create({
  input: {
    marginVertical: 2,
  },
});