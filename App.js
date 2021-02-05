import 'react-native-gesture-handler';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Button, Icon, Layout, Text } from '@ui-kitten/components';
import { default as theme } from './utils/theme.json'; // <-- Import app theme
import { default as mapping } from './utils/mapping.json'; // <-- Import app mapping [assets]
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppNavigator from './src/screens/navigator.component';


export default () => (
  <>
  <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} 
        theme={{ ...eva.light, ...theme }}
        customMapping={mapping} >
      <AppNavigator />
    </ApplicationProvider>
  </>
);
