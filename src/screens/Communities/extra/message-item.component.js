import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Avatar, Icon, ListItem, ListItemProps, Text, } from '@ui-kitten/components';
import { DoneAllIcon } from './icons';


export const MessageItem = (props) => {

  const { message, ...listItemProps } = props;

  console.log({message});
  const renderMessageDate = () => (
    <View style={styles.dateContainer}>
      {message.isRead && <DoneAllIcon/>}
      <Text
        style={styles.dateText}
        appearance='default'
        category='c1'
        >
        {message.date}
      </Text>
    </View>
  );


  const renderProfileAvatar = () => (
    <Avatar
      style={styles.avatar}
      //message.profile.photo
      size='small'
      source={ require("../assets/image-profile-1.jpg") }
    />
  );

  const renderItemIcon = (props) => (
    <Icon {...props} name='person'/>
  );

  return (
    <ListItem
      {...listItemProps}
      title={message.profile.fullName}
      description={message.formattedText}
      // icon={renderProfileAvatar}
      accessoryLeft={renderItemIcon}

      accessory={renderMessageDate}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    tintColor: null,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    textAlign: 'right',
    minWidth: 64,
  },
});
