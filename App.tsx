import React from 'react';
import {LogBox} from 'react-native';

import NavigationRoute from './navigation/NavigationRoute';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

  return (
    <>
      <NavigationRoute />
    </>
  );
};

export default App;
