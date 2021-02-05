import React from 'react';
import { ImageBackground, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Layout, List, Text } from '@ui-kitten/components';
import { HeartIcon, MessageCircleIcon } from './icons';

const data = [
    {
        title: 'hello world',
        details: 'xxxxxx',
        image: '',
        date: '2345',
        author: 'yom',
        likes: 2,
        comments: [],
    },
    {
      title: 'hello world',
      details: 'xxxxxx',
      image: '',
      date: '2345',
      author: 'yom',
      likes: 2,
      comments: [],
  },
  {
    title: 'hello world',
    details: 'xxxxxx',
    image: '',
    date: '2345',
    author: 'yom',
    likes: 2,
    comments: [],
},
{
  title: 'hello world',
  details: 'xxxxxx',
  image: '',
  date: '2345',
  author: 'yom',
  likes: 2,
  comments: [],
},
{
  title: 'hello world',
  details: 'xxxxxx',
  image: '',
  date: '2345',
  author: 'yom',
  likes: 2,
  comments: [],
},
{
  title: 'hello world',
  details: 'xxxxxx',
  image: '',
  date: '2345',
  author: 'yom',
  likes: 2,
  comments: [],
},

]

export default ({ navigation }) => {

  const onItemPress = () => {
    navigation && navigation.navigate('Details');
  };

  const renderItemHeader = (info) => (
    <ImageBackground
      style={styles.itemHeader}
      // source={require(info.item.image)}
    />
  );

  const renderItemFooter = (info) => (
    <View style={styles.itemFooter}>
      <Avatar source={info.item.author.photo}/>
      <View style={styles.itemAuthoringContainer}>
        <Text
          category='s2'>
          {info.item.author.fullName}
        </Text>
        <Text
          appearance='hint'
          category='c1'>
          {info.item.date}
        </Text>
      </View>
      <Button
        style={styles.iconButton}
        appearance='ghost'
        status='basic'
        icon={MessageCircleIcon}>
        {`${info.item.comments.length}`}
      </Button>
      <Button
        style={styles.iconButton}
        appearance='ghost'
        status='danger'
        icon={HeartIcon}>
        {`${info.item.likes.length}`}
      </Button>
    </View>
  );

  const renderItem = (info) => (
    <Card
      style={styles.item}
      header={() => renderItemHeader(info)}
      footer={() => renderItemFooter(info)}
      onPress={() => onItemPress(info.index)}>
      <Text category='h5'>
        {info.item.title}
      </Text>
      <Text
        style={styles.itemContent}
        appearance='hint'
        category='s1'>
        {`${info.item.details.substring(0, 82)}...`}
      </Text>
    </Card>
  );

  return (
    <Layout
      style={styles.container}
      level='2'>
      <List
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={data}
        renderItem={renderItem}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {
    marginVertical: 8,
  },
  itemHeader: {
    height: 220,
  },
  itemContent: {
    marginVertical: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  itemAuthoringContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});

