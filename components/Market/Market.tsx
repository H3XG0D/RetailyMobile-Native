import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {IStackScreenProps} from '../../navigation/StackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../constants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faPencilSquare} from '@fortawesome/free-solid-svg-icons/faPencilSquare';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {faCog} from '@fortawesome/free-solid-svg-icons/faCog';

const Market: React.FunctionComponent<IStackScreenProps> = props => {
  const {navigation} = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Главная',
      headerTitleAlign: 'left',
      headerLeft: () => <Text></Text>,
    });
  }, [navigation]);

  const logout = async () => {
    await AsyncStorage.removeItem('LOGIN');
    await AsyncStorage.removeItem('PASSWORD');
    navigation.navigate('Login');
  };

  return (
    <View style={{height: '100%'}}>
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

      <MarketMenuContainer>
        <MarketMenuTab onPress={() => navigation.navigate('Market')}>
          <MarketMenuItems>
            <FontAwesomeIcon
              icon={faHome}
              color={variables.COLORS.primary}
              size={28}
            />
            <MarketMenuText>Главная</MarketMenuText>
          </MarketMenuItems>
        </MarketMenuTab>

        <MarketMenuTab onPress={() => navigation.navigate('Request')}>
          <MarketMenuItems>
            <FontAwesomeIcon icon={faPencilSquare} color={'gray'} size={30} />
            <MarketMenuText>Заявки</MarketMenuText>
          </MarketMenuItems>
        </MarketMenuTab>

        <MarketMenuItems>
          <FontAwesomeIcon icon={faList} color={'gray'} size={30} />
          <MarketMenuWideText>Мои заявки</MarketMenuWideText>
        </MarketMenuItems>

        <MarketMenuItems>
          <FontAwesomeIcon icon={faCog} color={'gray'} size={30} />
          <MarketMenuText>Профиль</MarketMenuText>
        </MarketMenuItems>
      </MarketMenuContainer>
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

const MarketMenuContainer = styled.View`
  position: absolute;
  flex-direction: row;
  gap: 40px;
  width: 100%;
  height: 65px;
  justify-content: center;
  background-color: ${variables.COLORS.white};
  bottom: 0;
  right: 0;
`;

const MarketMenuItems = styled.View`
  align-items: center;
  justify-content: center;
  width: 55px;
`;

const MarketMenuText = styled.Text`
  font-size: ${variables.SIZES.h8};
  color: ${variables.COLORS.gray};
  margin-top: 5px;
`;

const MarketMenuWideText = styled.Text`
  font-size: ${variables.SIZES.h8};
  color: ${variables.COLORS.gray};
  margin-top: 5px;
  width: 67px;
`;

const MarketMenuTab = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
