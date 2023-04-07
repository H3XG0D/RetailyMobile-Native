import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons/faShoppingBasket';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {faCog} from '@fortawesome/free-solid-svg-icons/faCog';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../src/config/routes';
import BottomTabNav from './BottomTabNav';

const UserProfile = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Профиль',
      headerTitleAlign: 'left',
      headerLeft: () => <Text></Text>,
      headerTitleStyle: {fontSize: 27, fontWeight: '700'},
      animation: 'none',
    });
  }, [navigation]);

  const logout = async () => {
    await AsyncStorage.removeItem('login');
    await AsyncStorage.removeItem('password');
    await AsyncStorage.removeItem('token');
  };

  return (
    <MainUserProfile>
      <TouchableOpacity
        onPress={() => {
          logout();
        }}>
        <UserSignIn>
          <UserSignInText>Выйти</UserSignInText>
        </UserSignIn>
      </TouchableOpacity>
      <BottomTabNav />
    </MainUserProfile>
  );
};

export default UserProfile;

const MainUserProfile = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${variables.COLORS.white};
`;

const UserSignIn = styled.View`
  background-color: ${variables.COLORS.tertiary};
  border-radius: ${variables.SIZES.radius};
  margin-top: ${variables.SIZES.top};
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  width: 260px;
  height: 45px;
`;

const UserSignInText = styled.Text`
  color: ${variables.COLORS.white};
  font-weight: ${variables.SIZES.bold};
`;

const MarketBottomMenuContainer = styled.View`
  position: absolute;
  justify-content: space-between;
  flex-direction: row;
  background-color: ${variables.COLORS.white};
  width: 100%;
  bottom: 0;
  right: 0;
  padding: 10px 15px;
`;

const MarketBottomMenuItems = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
`;

const MarketBottomMenuText = styled.Text`
  font-size: ${variables.SIZES.h8};
  margin-top: 5px;
`;

const MarketBottomMenuWideText = styled.Text`
  color: ${variables.COLORS.gray};
  font-size: ${variables.SIZES.h8};
  margin-top: 5px;
`;

const MarketBottomMenuTab = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
