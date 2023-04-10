import React from 'react';
import {Text} from 'react-native';
import 'react-native-gesture-handler';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

import {
  RetailyRootStackParams,
  RetailyStackParams,
  RootStackParams,
} from '../src/config/routes';

import * as variables from '../constants';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import LoginPage from '../components/login/Login';
import Market from '../components/Market/Screens/Main/Market';
import MyRequest from '../components/Market/Screens/Main/MyRequest';
import Request from '../components/Market/Screens/Main/Request';
import UserProfile from '../components/Market/Screens/Main/UserProfile';
import Products from '../components/Market/Screens/Suppliers/Categories/Products/Products';
import Categories from '../components/Market/Screens/Suppliers/Categories/Categories';
import ParentMeat from '../components/Market/Screens/Suppliers/ParentMeat';
import Supplier from '../components/Market/Screens/Suppliers/Supplier';
import Forget from '../components/login/forget-password/Forget';
import ForgetCode from '../components/login/forget-password/ForgetCode';
import Code from '../components/login/registration/Code';
import ResetPassword from '../components/login/forget-password/ResetPassword';
import Details from '../components/login/registration/Details';
import Next from '../components/login/registration/Next';
import Registration from '../components/login/registration/Registration';
import LoadingScreen from '../components/login/LoadingScreen';

const RetailyRootStack = createNativeStackNavigator<RetailyRootStackParams>();
const RootStack = createBottomTabNavigator<RootStackParams>();
const RetailyStack = createNativeStackNavigator<RetailyStackParams>();

const RetailyBottomScreen = () => {
  return (
    <RetailyStack.Navigator initialRouteName="Market">
      <RetailyStack.Screen
        name="Market"
        component={Market}></RetailyStack.Screen>

      <RetailyStack.Screen
        name="Products"
        component={Products}></RetailyStack.Screen>

      <RetailyStack.Screen
        name="Categories"
        component={Categories}></RetailyStack.Screen>

      <RetailyStack.Screen
        name="ParentMeat"
        component={ParentMeat}></RetailyStack.Screen>

      <RetailyStack.Screen
        name="Supplier"
        component={Supplier}></RetailyStack.Screen>
    </RetailyStack.Navigator>
  );
};

const NavigationRoute = () => {
  return (
    <SafeAreaProvider>
      <RootStack.Navigator initialRouteName={'MarketStack'}>
        <RootStack.Screen
          name="MarketStack"
          component={RetailyBottomScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Главная',
            tabBarActiveTintColor: variables.COLORS.primary,
            tabBarIcon: tabinfo => {
              return (
                <Ionicons
                  name="md-home"
                  size={24}
                  color={
                    tabinfo.focused
                      ? variables.COLORS.primary
                      : variables.COLORS.gray
                  }></Ionicons>
              );
            },
          }}></RootStack.Screen>
        <RootStack.Screen
          name="Request"
          component={Request}
          options={{
            tabBarLabel: 'Корзина',
            tabBarActiveTintColor: variables.COLORS.primary,
            tabBarIcon: tabinfo => {
              return (
                <Ionicons
                  name="md-basket"
                  size={30}
                  color={
                    tabinfo.focused
                      ? variables.COLORS.primary
                      : variables.COLORS.gray
                  }></Ionicons>
              );
            },
          }}></RootStack.Screen>
        <RootStack.Screen
          name="MyRequest"
          component={MyRequest}
          options={{
            tabBarLabel: 'Мои заявки',
            tabBarActiveTintColor: variables.COLORS.primary,
            tabBarIcon: tabinfo => {
              return (
                <Ionicons
                  name="md-list"
                  size={30}
                  color={
                    tabinfo.focused
                      ? variables.COLORS.primary
                      : variables.COLORS.gray
                  }></Ionicons>
              );
            },
          }}></RootStack.Screen>
        <RootStack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            tabBarLabel: 'Профиль',
            tabBarActiveTintColor: variables.COLORS.primary,
            tabBarIcon: tabinfo => {
              return (
                <Ionicons
                  name="md-person"
                  size={26}
                  color={
                    tabinfo.focused
                      ? variables.COLORS.primary
                      : variables.COLORS.gray
                  }></Ionicons>
              );
            },
          }}></RootStack.Screen>
      </RootStack.Navigator>
    </SafeAreaProvider>
  );
};

const RootNavigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RetailyRootStack.Navigator initialRouteName="LoadingScreen">
          <RetailyRootStack.Screen
            name="Login"
            component={LoginPage}
            options={{headerShown: false}}></RetailyRootStack.Screen>

          <RetailyRootStack.Screen
            name="Forget"
            component={Forget}></RetailyRootStack.Screen>

          <RetailyRootStack.Screen
            name="ForgetCode"
            component={ForgetCode}></RetailyRootStack.Screen>

          <RetailyRootStack.Screen
            name="Code"
            component={Code}></RetailyRootStack.Screen>

          <RetailyRootStack.Screen
            name="ResetPassword"
            component={ResetPassword}></RetailyRootStack.Screen>

          <RetailyRootStack.Screen
            name="Details"
            component={Details}></RetailyRootStack.Screen>

          <RetailyRootStack.Screen
            name="Next"
            component={Next}></RetailyRootStack.Screen>

          <RetailyRootStack.Screen
            name="Registration"
            component={Registration}></RetailyRootStack.Screen>

          <RetailyRootStack.Screen
            name="LoadingScreen"
            component={LoadingScreen}></RetailyRootStack.Screen>

          <RetailyRootStack.Screen
            name="Market"
            component={NavigationRoute}
            options={{
              headerShown: false,
            }}></RetailyRootStack.Screen>
        </RetailyRootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigation;
