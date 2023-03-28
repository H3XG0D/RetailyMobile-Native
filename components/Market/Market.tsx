import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons/faShoppingBasket';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {faCog} from '@fortawesome/free-solid-svg-icons/faCog';
import {ScrollView} from 'react-native-gesture-handler';

import {IStackScreenProps} from '../../navigation/StackScreen';
import * as variables from '../../constants';

const Market: React.FunctionComponent<IStackScreenProps> = props => {
  const {navigation} = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Главная',
      headerTitleAlign: 'left',
      headerLeft: () => <Text></Text>,
      headerTitleStyle: {fontSize: 27, fontWeight: '700'},
    });
  }, [navigation]);

  const [active, setActive] = React.useState<boolean>(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <View style={{height: '100%'}}>
      <MarketPaginationContainer>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <MarketPaginationSpace>
            <TouchableOpacity>
              <MarketPaginationBox></MarketPaginationBox>
            </TouchableOpacity>
            <TouchableOpacity>
              <MarketPaginationBox></MarketPaginationBox>
            </TouchableOpacity>
            <TouchableOpacity>
              <MarketPaginationBox></MarketPaginationBox>
            </TouchableOpacity>
            <TouchableOpacity>
              <MarketPaginationBox></MarketPaginationBox>
            </TouchableOpacity>
          </MarketPaginationSpace>
        </ScrollView>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 25}}>
          <MarketPaginationSpace>
            <TouchableOpacity>
              <MarketPaginationFilterAll>
                <MarketPaginationFilterTextActive>
                  Все
                </MarketPaginationFilterTextActive>
              </MarketPaginationFilterAll>
            </TouchableOpacity>

            <TouchableOpacity>
              <MarketPaginationFilterBread>
                <MarketPaginationFilterTextNoActive>
                  Хлеб
                </MarketPaginationFilterTextNoActive>
              </MarketPaginationFilterBread>
            </TouchableOpacity>

            <TouchableOpacity>
              <MarketPaginationFilterMilk>
                <MarketPaginationFilterTextNoActive>
                  Молоко
                </MarketPaginationFilterTextNoActive>
              </MarketPaginationFilterMilk>
            </TouchableOpacity>

            <TouchableOpacity>
              <MarketPaginationFilterDrinks>
                <MarketPaginationFilterTextNoActive>
                  Напитки
                </MarketPaginationFilterTextNoActive>
              </MarketPaginationFilterDrinks>
            </TouchableOpacity>

            <TouchableOpacity>
              <MarketPaginationFilterMeat>
                <MarketPaginationFilterTextNoActive>
                  Мясные продукты
                </MarketPaginationFilterTextNoActive>
              </MarketPaginationFilterMeat>
            </TouchableOpacity>
          </MarketPaginationSpace>
        </ScrollView>
      </MarketPaginationContainer>

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
    </View>
  );
};

export default Market;

const MarketPaginationContainer = styled.View`
  background-color: ${variables.COLORS.white};
  height: 205px;
`;

const MarketPaginationBox = styled.View`
  background-color: gray;
  border-radius: 10px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 20px;
  width: 150px;
  height: 100px;
`;

const MarketPaginationFilterAll = styled.View`
  background-color: ${variables.COLORS.sixth};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 55px;
  height: 35px;
  margin-left: 5px;
  margin-right: 5px;
`;

const MarketPaginationFilterBread = styled.View`
  background-color: ${variables.COLORS.brightgray};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 60px;
  height: 35px;
  margin-left: 5px;
  margin-right: 5px;
`;

const MarketPaginationFilterMilk = styled.View`
  background-color: ${variables.COLORS.brightgray};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 75px;
  height: 35px;
  margin-left: 5px;
  margin-right: 5px;
`;

const MarketPaginationFilterDrinks = styled.View`
  background-color: ${variables.COLORS.brightgray};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 85px;
  height: 35px;
  margin-left: 5px;
  margin-right: 5px;
`;

const MarketPaginationFilterMeat = styled.View`
  background-color: ${variables.COLORS.brightgray};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 155px;
  height: 35px;
  margin-left: 5px;
  margin-right: 5px;
`;

const MarketPaginationSpace = styled.View`
  flex-direction: row;
  margin-left: 15px;
  margin-right: 15px;
`;

const MarketPaginationFilterTextActive = styled.Text`
  color: ${variables.COLORS.white};
  font-size: ${variables.SIZES.h6};
`;

const MarketPaginationFilterTextNoActive = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h6};
`;

// * Bottom Menu

const MarketBottomMenuContainer = styled.View`
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

const MarketBottomMenuItems = styled.View`
  align-items: center;
  justify-content: center;
  width: 55px;
`;

const MarketBottomMenuText = styled.Text`
  color: ${variables.COLORS.gray};
  font-size: ${variables.SIZES.h8};
  margin-top: 5px;
`;

const MarketBottomMenuWideText = styled.Text`
  color: ${variables.COLORS.gray};
  font-size: ${variables.SIZES.h8};
  margin-top: 5px;
  width: 67px;
`;

const MarketBottomMenuTab = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
