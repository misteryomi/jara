import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Icon } from '@ui-kitten/components';
import { BottomNavigation, BottomNavigationTab, Text } from '@ui-kitten/components';
import FeedScreen from '../Feed';
import CommunitiesScreen from '../Communities';
import Trending from '../Trending';
import New from '../New';
import Profile from '../Profile';

const ProfileIcon = (props) => (
    <Icon {...props} name='person-outline'/>
  );
  
const BellIcon = (props) => (
    <Icon {...props} name='bell-outline'/>
);

const PeopleIcon = (props) => (
    <Icon {...props} name='globe-2-outline'/>
);

const HomeIcon = (props) => (
    <Icon {...props} name='bar-chart-outline'/>
);


const NewIcon = (props) => (
    <Icon {...props} name='plus-square-outline'/>
);

const screens = [<FeedScreen />, <Trending />, <New />, <CommunitiesScreen />, <Profile />];

export const HomeScreen = ({ navigation }) => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>

        {screens[selectedIndex]}

        <BottomNavigation
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)} >
                <BottomNavigationTab icon={HomeIcon} title='Home'/>
                <BottomNavigationTab icon={BellIcon} title='Latest'/>
                <BottomNavigationTab icon={NewIcon} title='New'/>           
                <BottomNavigationTab icon={PeopleIcon} title='Communities'/>           
                <BottomNavigationTab icon={ProfileIcon} title='Profile'/>           
        </BottomNavigation>
    </SafeAreaView>
  );
};