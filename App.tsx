import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import routes from './src/config/routes';
import {StatusBar} from 'react-native';
import * as variables from './constants';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'LoadingScreen'}
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 24},
        }}>
        {routes.map((r, i) => (
          <Stack.Screen name={r.name} key={i}>
            {props => <r.component nameProp={r.name} {...props} />}
          </Stack.Screen>
        ))}
      </Stack.Navigator>
      <StatusBar backgroundColor={variables.COLORS.forth} />
    </NavigationContainer>
  );
}

export default App;
