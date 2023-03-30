import {Text} from 'react-native';
import React from 'react';
import {IStackScreenProps} from '../../navigation/StackScreen';
// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../constants';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons/faShoppingBasket';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {faCog} from '@fortawesome/free-solid-svg-icons/faCog';

const MyRequest: React.FunctionComponent<IStackScreenProps> = props => {
  const {navigation} = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Мои заявки',
      headerTitleAlign: 'left',
      headerLeft: () => <Text></Text>,
      headerTitleStyle: {fontSize: 27, fontWeight: '700'},
      animationEnabled: false,
    });
  }, [navigation]);

  return (
    <MyRequestMain>
      <MarketBottomMenuContainer>
        <MarketBottomMenuTab onPress={() => navigation.navigate('Market')}>
          <MarketBottomMenuItems>
            <FontAwesomeIcon icon={faHome} size={28} color={'gray'} />
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
            <FontAwesomeIcon
              icon={faList}
              color={variables.COLORS.primary}
              size={30}
            />
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
    </MyRequestMain>
  );
};

export default MyRequest;

const MyRequestMain = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${variables.COLORS.white};
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
