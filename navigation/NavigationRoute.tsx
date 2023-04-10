import React from 'react';
import 'react-native-gesture-handler';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RetailyStackParams, RootStackParams} from '../src/config/routes';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking, Platform} from 'react-native';

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
import BottomTabNav from './BottomTabNav';

const RootStack = createBottomTabNavigator<RootStackParams>();
const RetailyStack = createNativeStackNavigator<RetailyStackParams>();

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

const RetailyScreen = () => {
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
  const [isReady, setIsReady] = React.useState<boolean>(false);
  const [initialState, setInitialState] = React.useState<any>();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer
        initialState={initialState}
        onStateChange={state =>
          AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
        }>
        {/* Login Screens */}
        <RootStack.Navigator
          initialRouteName={'LoadingScreen'}
          screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 24},
          }}>
          <RootStack.Screen
            name="MarketStack"
            component={RetailyScreen}></RootStack.Screen>
          <RootStack.Screen
            name="Request"
            component={Request}></RootStack.Screen>
          <RootStack.Screen
            name="MyRequest"
            component={MyRequest}></RootStack.Screen>
          <RootStack.Screen
            name="UserProfile"
            component={UserProfile}></RootStack.Screen>
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default NavigationRoute;
