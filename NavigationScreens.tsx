import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import routes from './src/config/routes';

const NavigationScreens = () => {
  const Stack = createStackNavigator();

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
    </NavigationContainer>
  );
};

export default NavigationScreens;
