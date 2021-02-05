import React from 'react';
import { Card, Divider, Icon, Button, Input, TopNavigation } from '@ui-kitten/components';
import { Text, StyleSheet } from 'react-native';
import {actions, getContentCSS, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import { BaseLayout } from '../../components';


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
                    // actions.insertImage,
                    // actions.insertVideo,
                    // 'customAction',
                ]}                
                // insertVideo={insertVideo}
            />            
            <RichEditor
                ref={(r) => richtext = r}
                placeholder="Add details (optional)"
                style={{height: 104}}
                
                // initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
                // editorInitializedCallback={() => this.onEditorInitialized()}
            />    

            {/* <Input
                multiline={true}
                textStyle={{ minHeight: 104 }}
                placeholder='Add details (optional)'
                // {...multilineInputState}
            /> */}
            <Card>
                <Text>Hello</Text>
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