import React from 'react';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import * as variables from './constants';
import {LogBox} from 'react-native';
import NavigationScreens from './navigation/NavigationScreens';
import TabNavigation from './navigation/TabNavigation';

const TabContainer = () => {
  <TabNavigation />;
};

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

  return (
    <>
      <NavigationScreens />
      <StatusBar backgroundColor={variables.COLORS.forth} />
    </>
  );
};

export default App;
