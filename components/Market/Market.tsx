import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';

// Icons
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons/faShoppingBasket';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {faCog} from '@fortawesome/free-solid-svg-icons/faCog';

// ScrollView
import {ScrollView} from 'react-native-gesture-handler';

// Imports all exports from local project
import {IStackScreenProps} from '../../navigation/StackScreen';
import * as variables from '../../constants';
import {auth, getClient} from '../../api/api';

const Market: React.FunctionComponent<IStackScreenProps> = props => {
  const {navigation} = props;

  const [image, setImage] = React.useState<any>([]);
  const [suppliers, setSuppliers] = React.useState<any>([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Главная',
      headerTitleAlign: 'left',
      headerLeft: () => <Text></Text>,
      headerTitleStyle: {fontSize: 27, fontWeight: '700'},
    });
  }, [navigation]);

  const [tabs, setTabs] = React.useState<any>([
    {key: 0, value: 'Все', active: true},
    {key: 1, value: 'Хлеб', active: false},
    {key: 2, value: 'Молоко', active: false},
    {key: 3, value: 'Напитки', active: false},
    {key: 4, value: 'Мясные продукции', active: false},
  ]);

  const handleClick = (key: number) => {
    let newTabs = [...tabs];

    newTabs.forEach((item: any) => {
      item.active = false;
    });

    newTabs.find((item: any) => item.key === key).active = true;
    setTabs(newTabs);
  };

  const getBanners = async () => {
    const result = await getClient({cmd: 'getbanners'});
    setImage(result);
  };

  const getSuppliers = async () => {
    const result = await getClient({cmd: 'getsuppliers'});
    setSuppliers(result);
  };

  React.useEffect(() => {
    getBanners();
    getSuppliers();
  }, []);

  return (
    <View style={{height: '100%'}}>
      <MarketPaginationContainer>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <MarketPaginationSpace>
            {image?.standart && image.standart.length > 0
              ? image.standart.map((banner: any) => {
                  return (
                    <TouchableOpacity>
                      <MarketPaginationBox>
                        <Image
                          source={{
                            uri:
                              banner &&
                              banner.images &&
                              banner.images.length > 0
                                ? variables.siteUrl +
                                  '/api/repo/' +
                                  banner.images[0]
                                : undefined,
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                          }}></Image>
                      </MarketPaginationBox>
                    </TouchableOpacity>
                  );
                })
              : undefined}
          </MarketPaginationSpace>
        </ScrollView>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 25}}>
          <MarketPaginationSpace>
            {tabs.map((item: any) => {
              return (
                <TouchableOpacity onPress={() => handleClick(item.key)}>
                  <MarketPaginationFilterAll
                    style={{
                      backgroundColor: item.active ? '#288AF4' : '#E4E4E6',
                    }}>
                    <MarketPaginationFilterTexttabs
                      style={{color: item.active ? 'white' : 'black'}}>
                      {item.value}
                    </MarketPaginationFilterTexttabs>
                  </MarketPaginationFilterAll>
                </TouchableOpacity>
              );
            })}
          </MarketPaginationSpace>
        </ScrollView>
      </MarketPaginationContainer>

      <ScrollView>
        <MarketContentContainer>
          {suppliers?.suppliers && suppliers.suppliers.length > 0
            ? suppliers.suppliers.map((supplier: any) => {
                return (
                  <TouchableOpacity>
                    <MarketContentBoxContainer>
                      <MarketContentBox>
                        <Image
                          source={{
                            uri:
                              supplier &&
                              supplier.images &&
                              supplier.images.length > 0
                                ? variables.siteUrl +
                                  '/api/repo/' +
                                  supplier.images[0]
                                : undefined,
                          }}
                          style={{width: 130, height: 130}}></Image>
                        <MarketContentBoxText>
                          {supplier.name}
                        </MarketContentBoxText>
                      </MarketContentBox>
                    </MarketContentBoxContainer>
                  </TouchableOpacity>
                );
              })
            : undefined}
        </MarketContentContainer>
      </ScrollView>

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

// * Navbar Menu
const MarketPaginationContainer = styled.View`
  background-color: ${variables.COLORS.white};
  height: 205px;
`;

const MarketPaginationBox = styled.View`
  border-radius: 10px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 20px;
  width: 150px;
  height: 100px;
`;

const MarketPaginationFilterAll = styled.View`
  background-color: ${variables.COLORS.brightgray};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-left: 5px;
  margin-right: 5px;

  padding: 10px 15px;
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

const MarketPaginationFilterTexttabs = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h6};
`;

const MarketPaginationFilterTextNotabs = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h6};
`;

// * Content

const MarketContentContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 25px;
  padding: 30px 20px 20px 25px;
  margin-bottom: 80px;
`;

const MarketContentBox = styled.View`
  width: 160px;
  height: 190px;

  align-items: center;
  justify-content: center;
  z-index: 2;

  border-radius: 10px;
`;

const MarketContentBoxText = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h5};
  text-align: center;
`;

const MarketContentBoxContainer = styled.View`
  background-color: white;
  width: 160px;
  height: 200px;
  border-radius: 10px;
`;

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
