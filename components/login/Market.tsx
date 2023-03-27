import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {IStackScreenProps} from '../../navigation/StackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../constants';

const Market: React.FunctionComponent<IStackScreenProps> = props => {
  const {navigation} = props;

  const logout = async () => {
    await AsyncStorage.removeItem('KEY');
    navigation.navigate('Login');
  };

  return (
    <View>
      <MarketLogoutText>Добро пожаловать, в маркет!</MarketLogoutText>
      <TouchableOpacity
        onPress={() => {
          logout();
        }}
        style={{marginTop: 10}}>
        <MarketSignIn>
          <MarketSignInText>Выйти</MarketSignInText>
        </MarketSignIn>
      </TouchableOpacity>
    </View>
  );
};

export default Market;

const MarketSignIn = styled.View`
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

const MarketSignInText = styled.Text`
  color: ${variables.COLORS.white};
  font-weight: ${variables.SIZES.bold};
`;

const MarketLogoutText = styled.Text`
  margin-left: auto;
  margin-right: auto;
  margin-top: 250px;
  font-size: 20px;
  color: ${variables.COLORS.black};
`;
