import React from 'react';
import 'react-native-gesture-handler';
import {Text} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  RetailyRootStackParams,
  RetailyStackParams,
  RootStackParams,
} from '../src/config/routes';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import LoginPage from '../components/Login/Login';
import Forget from '../components/Login/forget-password/Forget';
import ForgetCode from '../components/Login/forget-password/ForgetCode';
import ResetPassword from '../components/Login/forget-password/ResetPassword';
import Details from '../components/Login/registration/Details';
import Next from '../components/Login/registration/Next';
import Registration from '../components/Login/registration/Registration';
import LoadingScreen from '../components/Login/LoadingScreen';
import Market from '../components/Market/Screens/Main/Market';
import Code from '../components/Login/registration/Code';
import MyRequest from '../components/Market/Screens/Main/MyRequest';
import Request from '../components/Market/Screens/Main/Request';
import UserProfile from '../components/Market/Screens/Main/UserProfile';
import Products from '../components/Market/Screens/Suppliers/Categories/Products/Products';
import Categories from '../components/Market/Screens/Suppliers/Categories/Categories';
import ParentMeat from '../components/Market/Screens/Suppliers/ParentMeat';
import Supplier from '../components/Market/Screens/Suppliers/Supplier';

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
      <RootStack.Navigator
        initialRouteName={'MarketStack'}
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 24},
        }}>
        <RootStack.Screen
          name="MarketStack"
          component={RetailyBottomScreen}
          options={{headerShown: false}}></RootStack.Screen>
        <RootStack.Screen name="Request" component={Request}></RootStack.Screen>
        <RootStack.Screen
          name="MyRequest"
          component={MyRequest}></RootStack.Screen>
        <RootStack.Screen
          name="UserProfile"
          component={UserProfile}></RootStack.Screen>
      </RootStack.Navigator>
    </SafeAreaProvider>
  );
};

const RootNavigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RetailyRootStack.Navigator
          initialRouteName="LoadingScreen"
          screenOptions={{headerLeft: () => <Text></Text>, headerShown: false}}>
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
            component={NavigationRoute}></RetailyRootStack.Screen>
        </RetailyRootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigation;
