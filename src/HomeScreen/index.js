import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Icon } from '@ui-kitten/components';
import { BottomNavigation, BottomNavigationTab, Text } from '@ui-kitten/components';
import { TabNavigator } from './nav';
import LatestScreen from '../Latest';
import CommunitiesScreen from '../Communities';

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

const navs = [<LatestScreen />, <CommunitiesScreen />];

export const HomeScreen = ({ navigation }) => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [screenComponent, setScreenComponent] = React.useState(<LatestScreen />);

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='MyApp' alignment='center'/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={navigateDetails}>OPEN DETAILS</Button>
      </Layout>

        {screenComponent}

        {/* <TabNavigator /> */}
        <BottomNavigation
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)} >
                <BottomNavigationTab icon={HomeIcon} title='Home'/>
                <BottomNavigationTab icon={BellIcon} title='Latest'/>
                <BottomNavigationTab icon={NewIcon} title='New'/>           
                <BottomNavigationTab icon={PeopleIcon} title='Communities'  onSelect={() => setScreenComponent(<CommunitiesScreen />)}/>           
                <BottomNavigationTab icon={ProfileIcon} title='Profile'/>           
        </BottomNavigation>
    </SafeAreaView>
  );
};