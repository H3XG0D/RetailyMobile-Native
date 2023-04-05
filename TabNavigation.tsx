import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import bottombar from './navigation/BottomBar';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as variables from './constants';
import {NavigationContainer} from '@react-navigation/native';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  const customBottomBar = {
    activeColor: '#278AF5',
    inActiveColor: 'gray',
    style: {backgroundColor: 'white'},
  };

  return (
    <Tab.Navigator tabBar={(props: any) => <BottomTabBar {...props} />}>
      {bottombar.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name}
          options={() => ({
            tabBarIcon: () => {
              return (
                <FontAwesomeIcon
                  icon={item.icon}
                  color={variables.COLORS.primary}
                  size={30}
                />
              );
            },
            headerShown: false,
          })}>
          {props => <item.component nameProp={item.name} {...props} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigation;
