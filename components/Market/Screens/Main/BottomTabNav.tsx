import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons/faShoppingBasket';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {faCog} from '@fortawesome/free-solid-svg-icons/faCog';

import * as variables from '../../../../constants';

// @ts-ignore
import styled from 'styled-components/native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../src/config/routes';

const BottomTabNav = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <MarketBottomMenuContainer>
      <MarketBottomMenuTab onPress={() => navigation.navigate('Market')}>
        <MarketBottomMenuItems>
          <FontAwesomeIcon
            icon={faHome}
            color={variables.COLORS.primary}
            size={28}
          />

          <MarketBottomMenuText>Главная</MarketBottomMenuText>
        </MarketBottomMenuItems>
      </MarketBottomMenuTab>

      <MarketBottomMenuTab onPress={() => navigation.navigate('Request')}>
        <MarketBottomMenuItems>
          <FontAwesomeIcon icon={faShoppingBasket} color={'gray'} size={30} />
          <MarketBottomMenuText>Корзина</MarketBottomMenuText>
        </MarketBottomMenuItems>
      </MarketBottomMenuTab>

      <MarketBottomMenuTab onPress={() => navigation.navigate('MyRequest')}>
        <MarketBottomMenuItems>
          <FontAwesomeIcon icon={faList} color={'gray'} size={30} />
          <MarketBottomMenuWideText>Мои заявки</MarketBottomMenuWideText>
        </MarketBottomMenuItems>
      </MarketBottomMenuTab>

      <MarketBottomMenuTab onPress={() => navigation.navigate('UserProfile')}>
        <MarketBottomMenuItems>
          <FontAwesomeIcon icon={faCog} color={'gray'} size={30} />
          <MarketBottomMenuText>Профиль</MarketBottomMenuText>
        </MarketBottomMenuItems>
      </MarketBottomMenuTab>
    </MarketBottomMenuContainer>
  );
};

export default BottomTabNav;

// * Bottom Menu

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
