import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import Modal from 'react-native-modal';
import styled from 'styled-components/native';

import {getProductsInfo} from '../../../../../../api/api';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons/faClose';
import ProductsSkeleton from '../../../Skeletons/ProductSkeleton/ProductsSkeleton';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../../../src/config/routes';

import * as variables from '../../../../../../constants';

const Products = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: category.name,
      headerTitleStyle: {fontSize: 20},
      animation: 'fade',
    });
  }, [navigation]);

  const route = useRoute();

  const {content}: any = route.params;
  const {selectShop}: any = route.params; // Shop
  const {category}: any = route.params; // Bread

  const [products, setProducts] = React.useState<any>(undefined);
  const [info, setInfo] = React.useState<any>(undefined);

  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const [loadSkeleton, setLoadSkeleton] = React.useState<boolean>(true);

  const [active, setActive] = React.useState<boolean>(false);
  const [buy, setBuy] = React.useState<boolean>(false);
  const [miniActive, setMiniActive] = React.useState<boolean>(false);
  const [choosed, setChoosed] = React.useState<string | undefined>(undefined);

  const getProducts = async () => {
    setLoadSkeleton(true);
    const products = await getProductsInfo(
      'getProducts',
      category.code,
      selectShop,
      content.code,
    );

    setProducts(products);
    setLoadSkeleton(false);
  };

  const showModal = () => {
    setModalVisible(!isModalVisible);
    setActive(true);
  };

  const AddProduct = (info: any) => {
    setActive(false);
    setBuy(false);
    let obj = {...info};

    obj.quantum = obj.step;
    setInfo(obj);
  };

  const incrementCounter = (info: any) => {
    let obj = {...info};

    obj.quantum = obj.quantum + obj.step;

    let newArray = [...products];
    let newRow = newArray.find((a: any) => a.code === obj.code);
    newRow.quantum = obj.quantum;

    setProducts(newArray);
    setInfo(obj);
  };

  const decrementCounter = (info: any) => {
    let obj = {...info};

    obj.quantum = obj.quantum - obj.step;

    let newArray = [...products];
    let newRow = newArray.find((a: any) => a.code === obj.code);
    newRow.quantum = obj.quantum;

    setProducts(newArray);
    setInfo(obj);
  };

  const HandleButton = (product: any) => {
    setInfo(product);
  };

  const makeActive = () => {
    AddProduct(info);
    setMiniActive(true);
  };

  const discount = (info?.price * info?.quantum).toFixed(2);

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <View>
      <ScrollView>
        <ProductsContentContainer>
          {loadSkeleton ? (
            <ProductsSkeleton />
          ) : (
            <>
              {products && products.length > 0
                ? products.map((product: any) => {
                    return (
                      <TouchableOpacity
                        onPress={() => showModal()}
                        onPressIn={() => HandleButton(product)}>
                        <ProductsContentBoxTextContainer>
                          <ProductsContentOutsideBox>
                            <ProductsContentBox>
                              <ProductsContentImages
                                source={{
                                  uri:
                                    product &&
                                    product.images &&
                                    product.images.length > 0
                                      ? variables.siteUrl +
                                        '/api/repo/' +
                                        product.images[0]
                                      : undefined,
                                }}
                              />
                              <ProductsContentBoxText numberOfLines={3}>
                                {product.name}
                              </ProductsContentBoxText>

                              {miniActive == true && choosed == product.code ? (
                                <>
                                  {buy ? (
                                    <Text
                                      style={{
                                        fontSize: variables.SIZES.h9,
                                        marginLeft: 10,
                                        marginBottom: 2,
                                        color: variables.COLORS.primary,
                                      }}>
                                      {product?.price}
                                    </Text>
                                  ) : (
                                    <>
                                      {product?.quantum <= 0 ? null : (
                                        <Text
                                          style={{
                                            fontSize: variables.SIZES.h9,
                                            marginLeft: 10,
                                            marginBottom: 2,
                                            color: variables.COLORS.primary,
                                          }}>
                                          {product?.price * product?.quantum}
                                        </Text>
                                      )}
                                    </>
                                  )}
                                </>
                              ) : null}

                              <ProductsContentBoxSubText>
                                {product.description_short}
                              </ProductsContentBoxSubText>

                              <TouchableOpacity
                                onPress={() => makeActive()}
                                onPressIn={() => setChoosed(product?.code)}>
                                {miniActive == true &&
                                choosed == product.code ? (
                                  <>
                                    {product?.quantum <= 0 ? (
                                      <ProductsContentBoxPriceContainer>
                                        <ProductsContentBoxPriceText>
                                          {product.price} ₽
                                        </ProductsContentBoxPriceText>
                                      </ProductsContentBoxPriceContainer>
                                    ) : (
                                      <ProductsContentBoxMiniPrice>
                                        <TouchableOpacity
                                          onPress={() =>
                                            decrementCounter(product)
                                          }>
                                          <ProductsMiniMinusBtn>
                                            <ProductsModalMinusText>
                                              -
                                            </ProductsModalMinusText>
                                          </ProductsMiniMinusBtn>
                                        </TouchableOpacity>
                                        <Text
                                          style={{
                                            fontSize: variables.SIZES.h8,
                                          }}>
                                          {product?.quantum}
                                        </Text>
                                        <TouchableOpacity
                                          onPress={() =>
                                            incrementCounter(product)
                                          }>
                                          <ProductsMiniMinusBtn>
                                            <ProductsModalPlusText>
                                              +
                                            </ProductsModalPlusText>
                                          </ProductsMiniMinusBtn>
                                        </TouchableOpacity>
                                      </ProductsContentBoxMiniPrice>
                                    )}
                                  </>
                                ) : (
                                  <ProductsContentBoxPriceContainer>
                                    <ProductsContentBoxPriceText>
                                      {product.price} ₽
                                    </ProductsContentBoxPriceText>
                                  </ProductsContentBoxPriceContainer>
                                )}
                              </TouchableOpacity>
                            </ProductsContentBox>
                          </ProductsContentOutsideBox>
                        </ProductsContentBoxTextContainer>
                      </TouchableOpacity>
                    );
                  })
                : undefined}
            </>
          )}
        </ProductsContentContainer>
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
            maxHeight: 1300 - 10,
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

            <ProductsModalImage
              source={{
                uri:
                  info && info.images && info.images.length > 0
                    ? variables.siteUrl + '/api/repo/' + info.images[0]
                    : undefined,
              }}
            />

            <ProductsModalContent>
              <ProductsModalHeader>
                <ProductsModalTitle>{info?.name}</ProductsModalTitle>
                <View style={{alignItems: 'center'}}>
                  {active == true ? (
                    <ProductsModalCost style={{color: variables.COLORS.black}}>
                      {info?.price} ₽
                    </ProductsModalCost>
                  ) : (
                    <>
                      {info?.quantum <= 0 ? (
                        <ProductsModalCost
                          style={{color: variables.COLORS.black}}>
                          {info?.price} ₽
                        </ProductsModalCost>
                      ) : (
                        <ProductsModalCost>{discount} ₽</ProductsModalCost>
                      )}
                    </>
                  )}
                  {active == true ? null : (
                    <>
                      {info?.quantum <= 0 ? null : (
                        <ProductsModalSubtitleCost>
                          {info?.price} ₽
                        </ProductsModalSubtitleCost>
                      )}
                    </>
                  )}
                </View>
              </ProductsModalHeader>

              {active == true ? (
                <TouchableOpacity onPress={() => AddProduct(info)}>
                  <ProductsModalBtn>
                    <ProductsModalBtnText>{info?.price} ₽</ProductsModalBtnText>
                  </ProductsModalBtn>
                </TouchableOpacity>
              ) : (
                <>
                  {info?.quantum <= 0 ? (
                    <TouchableOpacity onPress={() => AddProduct(info)}>
                      <ProductsModalBtn>
                        <ProductsModalBtnText>
                          {info?.price} ₽
                        </ProductsModalBtnText>
                      </ProductsModalBtn>
                    </TouchableOpacity>
                  ) : (
                    <ProductsModalCountView>
                      <TouchableOpacity onPress={() => decrementCounter(info)}>
                        <ProductsModalMinusBtn>
                          <ProductsModalMinusText>-</ProductsModalMinusText>
                        </ProductsModalMinusBtn>
                      </TouchableOpacity>
                      <ProductsModalCountInput>
                        <Text>{info?.quantum}</Text>
                      </ProductsModalCountInput>
                      <TouchableOpacity onPress={() => incrementCounter(info)}>
                        <ProductsModalPlusBtn>
                          <ProductsModalPlusText>+</ProductsModalPlusText>
                        </ProductsModalPlusBtn>
                      </TouchableOpacity>
                    </ProductsModalCountView>
                  )}
                </>
              )}

              <ProductModalInfoContainer>
                {info?.properties1 && info?.properties1.length > 0
                  ? info.properties1.map((prop: any) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <View style={{marginLeft: '5%'}}>
                            <ProductModalInfoCharacteristic>
                              {prop.name}:
                            </ProductModalInfoCharacteristic>
                          </View>

                          <View
                            style={{
                              width: 150,
                              marginLeft: 'auto',
                              marginRight: '10%',
                            }}>
                            <ProductModalInfoText>
                              {prop.value}
                            </ProductModalInfoText>
                          </View>
                        </View>
                      );
                    })
                  : undefined}
              </ProductModalInfoContainer>
            </ProductsModalContent>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Products;

const ProductsContentContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px 10px 10px 15px;
  gap: 10px;
`;

const ProductsContentOutsideBox = styled.View`
  margin-bottom: 125%;
`;

const ProductsContentBox = styled.View`
  background-color: ${variables.COLORS.white};
  width: 115px;
  height: 110px;
  border-radius: 8px;
`;

const ProductsContentImages = styled.Image`
  object-fit: contain;
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const ProductsContentBoxText = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h9};
  height: 50%;
  margin-left: 10px;
  margin-top: 10px;
`;

const ProductsContentBoxSubText = styled.Text`
  color: ${variables.COLORS.gray};
  font-size: ${variables.SIZES.h9};
  margin-left: 10px;
`;

const ProductsContentBoxPriceContainer = styled.View`
  background-color: ${variables.COLORS.white};
  font-size: ${variables.SIZES.h8};
  margin-top: 15px;
  width: 90px;
  padding: 5px;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
`;

const ProductsContentBoxPriceText = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h8};
  text-align: center;
`;

const ProductsContentBoxMiniPrice = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 10px;
  margin-top: 10px;
`;

const ProductsContentBoxTextContainer = styled.View`
  background-color: ${variables.COLORS.brightgray};
  border-radius: 8px;
  margin-bottom: 15px;
`;

const ProductsModalContent = styled.View`
  background-color: ${variables.COLORS.milky};
  height: 450px;
`;

const ProductsModalBackground = styled.View`
  max-height: 1300px - 10px;
  width: 100%;
  background-color: white;
  border-radius: 15px;
  margin-top: 50px;
`;

const ProductsModalImage = styled.Image`
  width: 300px;
  height: 250px;
  border-radius: 15px;
  object-fit: contain;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
`;

const ProductsModalHeader = styled.View`
  gap: 20px;
  margin-left: 20px;
  margin-top: 20px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ProductsModalTitle = styled.Text`
  font-size: ${variables.SIZES.h6};
  color: ${variables.COLORS.black};
  width: 235px;
`;

const ProductsModalCost = styled.Text`
  font-size: ${variables.SIZES.h5};
  font-weight: ${variables.SIZES.bold};
  color: ${variables.COLORS.forth};
`;

const ProductsModalSubtitleCost = styled.Text`
  font-size: ${variables.SIZES.h7};
  font-weight: ${variables.SIZES.bold};
  color: ${variables.COLORS.gray};
`;

const ProductsModalBtn = styled.View`
  background-color: ${variables.COLORS.tertiary};
  border-radius: ${variables.SIZES.radius};
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 45px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
`;

const ProductsModalBtnText = styled.Text`
  color: ${variables.COLORS.white};
  font-size: ${variables.SIZES.h5};
  font-weight: ${variables.SIZES.bold};
`;

const ProductModalInfoContainer = styled.View`
  margin-top: 20px;
  gap: 10px;
`;

const ProductModalInfoCharacteristic = styled.Text`
  color: ${variables.COLORS.gray};
  font-size: ${variables.SIZES.h8};
  text-align: right;
  width: 150px;
`;

const ProductModalInfoText = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h8};
`;

const ProductsModalCountView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  gap: 15px;
`;

const ProductsModalMinusBtn = styled.View`
  background-color: ${variables.COLORS.white};
  border-radius: ${variables.SIZES.radius};
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
`;

const ProductsModalMinusText = styled.Text`
  font-weight: ${variables.SIZES.bold};
`;

const ProductsMiniMinusBtn = styled.View`
  background-color: ${variables.COLORS.white};
  border-radius: ${variables.SIZES.radius};
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`;

const ProductsModalCountInput = styled.TextInput`
  font-size: 20px;
  width: 80px;
  height: 50px;
  background-color: ${variables.COLORS.white};
  color: ${variables.COLORS.black};
  font-weight: ${variables.SIZES.bold};
  text-align: center;
`;

const ProductsModalPlusBtn = styled.View`
  background-color: ${variables.COLORS.white};
  border-radius: ${variables.SIZES.radius};
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
`;

const ProductsModalPlusText = styled.Text`
  font-weight: ${variables.SIZES.bold};
`;
