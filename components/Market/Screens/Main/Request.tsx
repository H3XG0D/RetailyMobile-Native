import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../../../constants';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RetailyStackParams} from '../../../../src/config/routes';
import {useFocusEffect} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import {IQuantity} from '../../../../redux/types/types';

interface Props {
  quantity: IQuantity | undefined;
}

const Request = (props: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RetailyStackParams>>();

  const [products, setProducts] = React.useState<any>();
  const [images, setImages] = React.useState<any>();

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Заявки',
      headerTitleAlign: 'left',
      headerLeft: () => <Text></Text>,
      headerTitleStyle: {fontSize: 27, fontWeight: '700'},
      animation: 'none',
    });
  }, [navigation]);

  // const getProducts = async () => {
  //   const getProductData = await AsyncStorage.getItem('savedProductData');
  //   if (getProductData != null) {
  //     const array = JSON.parse(getProductData);
  //     setProducts(array.data);
  //   } else {
  //     console.log('error');
  //   }
  // };

  // const readData = async () => {
  //   const productCode = await AsyncStorage.getItem('ProductCode');
  //   const productName = await AsyncStorage.getItem('ProductName');
  //   const productQuantum = await AsyncStorage.getItem('ProductQuantum');
  //   const productImage = await AsyncStorage.getItem('ProductImages');
  //   const productPrice = await AsyncStorage.getItem('ProductPrice');
  //   const productWeight = await AsyncStorage.getItem('ProductWeight');
  //   const productFinalCost = await AsyncStorage.getItem('ProductFinalCost');

  //   const productDetail = [
  //     {
  //       name: productName,
  //       code: productCode,
  //       quantum: productQuantum,
  //       image: productImage,
  //       price: productPrice,
  //       weight: productWeight,
  //       final: productFinalCost,
  //     },
  //   ];
  //   setProducts(productDetail);

  //   const image = productImage?.replace(/"/g, '');
  //   setImages(image);
  // };

  // React.useEffect(() => {
  //   readData();
  // }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     readData();
  //   }, []),
  // );

  return (
    <View>
      <Text>{props.quantity?.count}</Text>
      {/* <RequestMain style={{elevation: 1}}>
        <Text>Корзина для покупок</Text>
      </RequestMain>
      <FlatList
        data={[1, 1, 1, 1]}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: '93%',
                alignSelf: 'center',
                height: 120,
                backgroundColor: '#FFF',
                marginTop: 10,
                borderRadius: 10,
                elevation: 1,
                flexDirection: 'row',
              }}></View>
          );
        }}></FlatList> */}

      {/* {products && products.length > 0
        ? products.map((res: any) => {
            return (
              <RequestMain>
                <View
                  style={{
                    width: '93%',
                    alignItems: 'center',
                    height: 120,
                    backgroundColor: '#FFF',
                    marginTop: 10,
                    borderRadius: 10,
                    elevation: 1,
                    flexDirection: 'row',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      width: 110,
                      height: 80,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 10,
                      gap: 20,
                      marginLeft: 20,

                      borderTopWidth: 1,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,

                      borderColor: variables.COLORS.brightgray,
                    }}>
                    <Image
                      source={{uri: images}}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                        borderRadius: 10,
                        padding: 5,
                      }}></Image>
                    <View>
                      <Text
                        numberOfLines={3}
                        style={{fontSize: variables.SIZES.h8}}>
                        {JSON.stringify(res.name).replace(/\\|"/g, '')}
                      </Text>
                      <Text
                        style={{
                          fontSize: variables.SIZES.h9,
                          color: variables.COLORS.gray,
                          marginTop: 3,
                        }}>
                        {JSON.stringify(res.weight).replace(/\\|"/g, '')}{' '}
                        <Text style={{color: variables.COLORS.primary}}>
                          • {JSON.stringify(res.price).replace(/\\|"/g, '')} ₽
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginLeft: 'auto',
                      marginBottom: 'auto',
                      marginRight: 5,
                      marginTop: 20,
                    }}>
                    <View>
                      <Text
                        style={{
                          color: variables.COLORS.primary,
                          fontSize: variables.SIZES.h9,
                          fontWeight: '600',
                          marginLeft: 'auto',
                        }}>
                        {JSON.stringify(res.final).replace(/\\|"/g, '')} ₽
                      </Text>
                      <View
                        style={{
                          alignItems: 'center',
                          marginTop: 15,
                          gap: 10,
                          flexDirection: 'row',
                        }}>
                        <TouchableOpacity>
                          <MiniBtnView>
                            <MiniBtnText>-</MiniBtnText>
                          </MiniBtnView>
                        </TouchableOpacity>
                        <Text>
                          {JSON.stringify(res.quantum).replace(/\\|"/g, '')}
                        </Text>
                        <TouchableOpacity>
                          <MiniBtnView>
                            <MiniBtnText>+</MiniBtnText>
                          </MiniBtnView>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <TouchableOpacity>
                  <PaymentButtonView>
                    <PaymentButtonText>Оформить заявку</PaymentButtonText>
                  </PaymentButtonView>
                </TouchableOpacity>
              </RequestMain>
            );
          })
        : null} */}
    </View>
  );
};

export default Request;

const RequestMain = styled.View`
  width: 100%;
  background-color: ${variables.COLORS.white};
`;

const MiniBtnView = styled.View`
  background-color: ${variables.COLORS.brightgray};
  border-radius: ${variables.SIZES.radius};
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`;

const MiniBtnText = styled.Text`
  font-weight: bold;
`;

const PaymentButtonView = styled.View`
  background-color: ${variables.COLORS.tertiary};
  border-radius: ${variables.SIZES.radius};
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 40px;
  margin-left: auto;
  margin-right: auto;
`;

const PaymentButtonText = styled.Text`
  color: ${variables.COLORS.white};
  font-size: ${variables.SIZES.h7};
  font-weight: ${variables.SIZES.bold};
`;
