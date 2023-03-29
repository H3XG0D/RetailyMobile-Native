import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {IStackScreenProps} from '../../navigation/StackScreen';
// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile: React.FunctionComponent<IStackScreenProps> = props => {
  const {navigation} = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Профиль',
      headerTitleAlign: 'left',
      headerLeft: () => <Text></Text>,
      headerTitleStyle: {fontSize: 27, fontWeight: '700'},
    });
  }, [navigation]);

  const logout = async () => {
    await AsyncStorage.removeItem('login');
    await AsyncStorage.removeItem('password');
    await AsyncStorage.removeItem('token');

    navigation.navigate('Login');
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