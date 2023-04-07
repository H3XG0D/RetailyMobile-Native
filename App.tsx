import React from 'react';
import {LogBox} from 'react-native';

import NavigationRoute from './navigation/NavigationRoute';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

  return (
    <SafeAreaProvider>
      <NavigationRoute />
    </SafeAreaProvider>
  );
};

export default App;
