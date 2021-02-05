import React from 'react';
import { ListRenderItemInfo, Text } from 'react-native';
import { Divider, Input, Layout, List, StyleService, TopNavigation, useStyleSheet } from '@ui-kitten/components';
import { MessageItem } from './extra/message-item.component';
import { ArrowIosBackIcon, SearchIcon } from './extra/icons';

const initialMessages = [
  {
    text: 'Je;;o',
    date: '04:30',
    isRead: false,
    formattedText: 'xsjsjsjs',
    profile: {
      fullName: 'Yomi J',
      photo: './assets/image-profile-1.jpg'
    }
  },
  {
    text: 'Je;;o',
    date: '04:30',
    isRead: false,
    formattedText: 'xsjsjsjs',
    profile: {
      fullName: 'Yomi J',
      photo: './assets/image-profile-1.jpg'
    }
  },
  {
    text: 'Je;;o',
    date: '04:30',
    isRead: false,
    formattedText: 'xsjsjsjs',
    profile: {
      fullName: 'Yomi J',
      photo: './assets/image-profile-1.jpg'
    }
  },
];

export default ({ navigation }) => {

  const styles = useStyleSheet(themedStyles);
  const [searchQuery, setSearchQuery] = React.useState();

  const onItemPress = (index) => {
    navigation && navigation.navigate('Chat1');
  };

  const renderItem = (info) => (
    <MessageItem
      style={styles.item}
      message={info.item}
      onPress={onItemPress}
    />
  );

  const renderHeader = () => (
    <>
    <TopNavigation 
      icon={ArrowIosBackIcon}
      title='Communities'/>
    <Divider/>
    <Layout
      style={styles.header}
      level='2'>
      <Input
        placeholder='Search'
        value={searchQuery}
        icon={SearchIcon}
      />
    </Layout>
    </>
  );

  return (
    <List
      style={styles.list}
      data={initialMessages}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
    />
  );
};

const themedStyles = StyleService.create({
  list: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3',
  },
});
