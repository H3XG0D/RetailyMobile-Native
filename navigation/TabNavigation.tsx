import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import bottombar from './BottomBar';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as variables from '../constants';
import {NavigationContainer} from '@react-navigation/native';
import {faHome} from '@fortawesome/free-solid-svg-icons';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {bottombar.map((item, index) => (
          <Tab.Screen
            key={index}
            name={item.name}
            options={() => ({
              tabBarIcon: () => {
                return (
                  <FontAwesomeIcon
                    icon={faHome}
                    color={variables.COLORS.primary}
                    size={30}
                  />
                );
              },
              headerShown: false,
              tabBarActiveTintColor: '#278AF5',
              tabBarInactiveTintColor: 'gray',
            })}>
            {props => <item.component nameProp={item.name} {...props} />}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
