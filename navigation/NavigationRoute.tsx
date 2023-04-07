import React from 'react';
import 'react-native-gesture-handler';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParams} from '../src/config/routes';

import LoginPage from '../components/Login/Login';
import Market from '../components/Market/Screens/Main/Market';
import Forget from '../components/Login/forget-password/Forget';
import ForgetCode from '../components/Login/forget-password/ForgetCode';
import Code from '../components/Login/registration/Code';
import ResetPassword from '../components/Login/forget-password/ResetPassword';
import Details from '../components/Login/registration/Details';
import Next from '../components/Login/registration/Next';
import Registration from '../components/Login/registration/Registration';
import LoadingScreen from '../components/Login/LoadingScreen';
import MyRequest from '../components/Market/Screens/Main/MyRequest';
import Request from '../components/Market/Screens/Main/Request';
import UserProfile from '../components/Market/Screens/Main/UserProfile';
import Products from '../components/Market/Screens/Suppliers/Categories/Products/Products';
import Categories from '../components/Market/Screens/Suppliers/Categories/Categories';
import ParentMeat from '../components/Market/Screens/Suppliers/ParentMeat';
import Supplier from '../components/Market/Screens/Suppliers/Supplier';
import BottomTabNav from '../components/Market/Screens/Main/BottomTabNav';

const RootStack = createNativeStackNavigator<RootStackParams>();

const NavigationRoute = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* Login Screens */}
        <RootStack.Navigator
          initialRouteName={'LoadingScreen'}
          screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 24},
          }}>
          <RootStack.Screen
            name="Login"
            component={LoginPage}
            options={{headerShown: false}}></RootStack.Screen>

          <RootStack.Screen name="Forget" component={Forget}></RootStack.Screen>
          <RootStack.Screen
            name="ForgetCode"
            component={ForgetCode}></RootStack.Screen>

          <RootStack.Screen name="Code" component={Code}></RootStack.Screen>

          <RootStack.Screen
            name="ResetPassword"
            component={ResetPassword}></RootStack.Screen>

          <RootStack.Screen
            name="Details"
            component={Details}></RootStack.Screen>

          <RootStack.Screen name="Next" component={Next}></RootStack.Screen>

          <RootStack.Screen
            name="Registration"
            component={Registration}></RootStack.Screen>

          <RootStack.Screen
            name="LoadingScreen"
            component={LoadingScreen}></RootStack.Screen>

          <RootStack.Screen
            name="MyRequest"
            component={MyRequest}></RootStack.Screen>

          <RootStack.Screen
            name="Request"
            component={Request}></RootStack.Screen>

          <RootStack.Screen
            name="UserProfile"
            component={UserProfile}></RootStack.Screen>

          <RootStack.Screen
            name="Products"
            component={Products}></RootStack.Screen>

          <RootStack.Screen
            name="Categories"
            component={Categories}></RootStack.Screen>

          <RootStack.Screen
            name="ParentMeat"
            component={ParentMeat}></RootStack.Screen>

          <RootStack.Screen
            name="Supplier"
            component={Supplier}></RootStack.Screen>

          <RootStack.Screen
            name="BottomTabNav"
            component={BottomTabNav}></RootStack.Screen>

          <RootStack.Screen name="Market" component={Market}></RootStack.Screen>
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default NavigationRoute;
