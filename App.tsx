import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import routes from './src/config/routes';
import {StatusBar} from 'react-native';
import * as variables from './constants';
import {LogBox} from 'react-native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import bottombar from './navigation/BottomBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const customBottomBar = {
  activeColor: '#278AF5',
  inActiveColor: 'gray',
  style: {backgroundColor: 'white'},
};

function App() {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

  return (
    <>
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

      {/* <NavigationContainer>
        <Tab.Navigator tabBar={(props: any) => <BottomTabBar {...props} />}>
          {bottombar.map((item, index) => (
            <Tab.Screen
              key={index}
              name={item.name}
              options={() => ({
                tabBarIcon: ({focused, color, size}) => {
                  let IconName;
                },
                headerShown: false,
              })}>
              {item.component}
            </Tab.Screen>
          ))}
        </Tab.Navigator>
      </NavigationContainer> */}
    </>
  );
}

export default App;
