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
      headerTitleStyle: {fontSize: 27},
    });
  }, [navigation]);

  return (
    <View style={{height: '100%'}}>
      <MarketPaginationContainer></MarketPaginationContainer>
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

        <MarketMenuTab onPress={() => navigation.navigate('MyRequest')}>
          <MarketMenuItems>
            <FontAwesomeIcon icon={faList} color={'gray'} size={30} />
            <MarketMenuWideText>Мои заявки</MarketMenuWideText>
          </MarketMenuItems>
        </MarketMenuTab>

        <MarketMenuTab onPress={() => navigation.navigate('UserProfile')}>
          <MarketMenuItems>
            <FontAwesomeIcon icon={faCog} color={'gray'} size={30} />
            <MarketMenuText>Профиль</MarketMenuText>
          </MarketMenuItems>
        </MarketMenuTab>
      </MarketMenuContainer>
    </View>
  );
};

export default Market;

const MarketPaginationContainer = styled.View`
  width: 100%;
  height: 250px;
  background-color: ${variables.COLORS.white};
`;

const MarketMenuContainer = styled.View`
  position: absolute;
  justify-content: center;
  flex-direction: row;
  background-color: ${variables.COLORS.white};
  width: 100%;
  height: 65px;
  gap: 40px;
  bottom: 0;
  right: 0;
`;

const MarketMenuItems = styled.View`
  align-items: center;
  justify-content: center;
  width: 55px;
`;

const MarketMenuText = styled.Text`
  color: ${variables.COLORS.gray};
  font-size: ${variables.SIZES.h8};
  margin-top: 5px;
`;

const MarketMenuWideText = styled.Text`
  color: ${variables.COLORS.gray};
  font-size: ${variables.SIZES.h8};
  margin-top: 5px;
  width: 67px;
`;

const MarketMenuTab = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
