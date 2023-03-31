import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
// @ts-ignore
import styled from 'styled-components/native';

// Icons
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons/faShoppingBasket';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {faCog} from '@fortawesome/free-solid-svg-icons/faCog';
import {faClose} from '@fortawesome/free-solid-svg-icons/faClose';

// ScrollView
import {ScrollView} from 'react-native-gesture-handler';

// Imports all exports from local project
import {IStackScreenProps} from '../../navigation/StackScreen';
import * as variables from '../../constants';
import {getClient} from '../../api/api';

const Market: React.FunctionComponent<IStackScreenProps> = props => {
  const {navigation} = props;

  const [image, setImage] = React.useState<any>([]);
  const [suppliers, setSuppliers] = React.useState<any>([]);
  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Главная',
      headerTitleAlign: 'left',
      headerLeft: () => <Text></Text>,
      headerTitleStyle: {fontSize: 27, fontWeight: '700'},
      animationEnabled: false,
    });
  }, [navigation]);

  const [active, setActive] = React.useState<string | undefined>(undefined);
  const [content, setContent] = React.useState<any>(undefined);

  const getBanners = async () => {
    const result = await getClient({cmd: 'getbanners'});
    setImage(result);
  };

  const getSuppliers = async () => {
    const result = await getClient({cmd: 'getsuppliers'});
    setSuppliers(result);
  };

  const showModal = () => {
    setModalVisible(!isModalVisible);
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
                    <TouchableOpacity
                      onPress={() => showModal()}
                      onPressIn={() => setContent(banner)}>
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
          <TouchableOpacity onPress={() => setActive(undefined)}>
            <MarketPaginationFilterAll
              style={{
                backgroundColor: active === undefined ? '#288AF4' : '#E4E4E6',
              }}>
              <MarketPaginationFilterTextTabs
                style={{color: active === undefined ? 'white' : 'black'}}>
                Все
              </MarketPaginationFilterTextTabs>
            </MarketPaginationFilterAll>
          </TouchableOpacity>
          <MarketPaginationSpace>
            {suppliers?.tags?.map((item: any) => {
              return (
                <TouchableOpacity onPress={() => setActive(item.code)}>
                  <MarketPagnationFilters
                    style={{
                      backgroundColor:
                        item.code === active ? '#288AF4' : '#E4E4E6',
                    }}>
                    <MarketPaginationFilterTextTabs
                      style={{color: item.code === active ? 'white' : 'black'}}>
                      {item.name}
                    </MarketPaginationFilterTextTabs>
                  </MarketPagnationFilters>
                </TouchableOpacity>
              );
            })}
          </MarketPaginationSpace>
        </ScrollView>
      </MarketPaginationContainer>
      <ScrollView>
        <MarketContentContainer>
          {suppliers?.suppliers && suppliers.suppliers.length > 0
            ? suppliers.suppliers
                .filter(
                  (f: any) =>
                    (f.tags && f.tags.some((t: any) => t === active)) ||
                    !active,
                )
                .map((supplier: any) => {
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

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.4}
        style={{
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            maxHeight: 1100 - 20,
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 15,
            marginTop: 50,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={() => showModal()}>
              <FontAwesomeIcon
                icon={faClose}
                size={28}
                style={{
                  marginLeft: 'auto',
                  marginRight: 20,
                  marginTop: 15,
                }}></FontAwesomeIcon>
            </TouchableOpacity>
            <Image
              source={{
                uri:
                  variables.siteUrl +
                  '/api/repo/' +
                  (content && content.images?.length > 0
                    ? content.images[0]
                    : undefined),
              }}
              style={{
                width: 330,
                height: 200,
                borderRadius: 15,
                marginTop: 20,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}></Image>
            <MarketBannerView>
              <MarketBannerTitle>
                {content ? content.title : undefined}
              </MarketBannerTitle>
              <MarketBannerSubtitle>
                {content ? content.content : undefined}
              </MarketBannerSubtitle>
            </MarketBannerView>
            <TouchableOpacity>
              <MarketBannerButton>
                <MarketBannerButtonText>Перейти</MarketBannerButtonText>
              </MarketBannerButton>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

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
  padding: 10px 15px;
  margin-left: 15px;
`;

const MarketPagnationFilters = styled.View`
  background-color: ${variables.COLORS.brightgray};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-left: 5px;
  margin-right: 5px;

  padding: 10px 15px;
`;

const MarketPaginationSpace = styled.View`
  flex-direction: row;
  margin-left: 5px;
  margin-right: 15px;
`;

const MarketPaginationFilterTextTabs = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h6};
`;

// * Content

const MarketContentContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 25px;

  padding: 10px 10px 10px 15px;
  margin-top: 20px;
  margin-bottom: 90px;

  /* padding: 30px 20px 20px 25px; */
`;

const MarketContentBox = styled.View`
  width: 160px;
  height: 190px;

  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const MarketContentBoxText = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h5};
  text-align: center;
`;

const MarketBannerView = styled.View`
  padding: 20px 20px;
  margin-left: 10px;
  gap: 10px;
`;

const MarketBannerTitle = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h3};
  font-weight: ${variables.SIZES.bold};
`;

const MarketBannerSubtitle = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h8};
`;

const MarketBannerButton = styled.View`
  background-color: ${variables.COLORS.tertiary};
  border-radius: ${variables.SIZES.radius};
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 45px;
  margin-top: 5px;
  margin-bottom: 60px;
  margin-left: auto;
  margin-right: auto;
`;

const MarketBannerButtonText = styled.Text`
  color: ${variables.COLORS.white};
  font-size: ${variables.SIZES.h6};
  font-weight: ${variables.SIZES.bold};
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
