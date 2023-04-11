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

const Request = () => {
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

  const readData = async () => {
    const productCode = await AsyncStorage.getItem('ProductCode');
    const productName = await AsyncStorage.getItem('ProductName');
    const productQuantum = await AsyncStorage.getItem('ProductQuantum');
    const productImage = await AsyncStorage.getItem('ProductImages');
    const productPrice = await AsyncStorage.getItem('ProductPrice');

    const productDetail = [
      {
        name: productName,
        code: productCode,
        quantum: productQuantum,
        image: productImage,
        price: productPrice,
      },
    ];
    setProducts(productDetail);

    const image = productImage?.replace(/"/g, '');
    setImages(image);
  };

  React.useEffect(() => {
    readData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      readData();
    }, []),
  );

  return (
    <View style={{flex: 1}}>
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

      {products && products.length > 0
        ? products.map((res: any) => {
            return (
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
                  justifyContent: 'center',
                  gap: 15,
                }}>
                <View
                  style={{
                    width: 80,
                    height: 80,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 40,
                  }}>
                  <Image
                    source={{uri: images}}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}></Image>
                  <View>
                    <Text>{JSON.stringify(res.name).replace(/\\|"/g, '')}</Text>
                  </View>
                  <View>
                    <Text style={{color: variables.COLORS.primary}}>
                      {JSON.stringify(res.price).replace(/\\|"/g, '')} ₽
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        : null}
    </View>
  );
};

export default Request;

const RequestMain = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  background-color: '#FFF';
`;
