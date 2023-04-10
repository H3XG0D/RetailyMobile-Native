import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../../../constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RetailyStackParams} from '../../../../src/config/routes';

const Request = () => {
  const [products, setProducts] = React.useState<any>(undefined);

  const navigation =
    useNavigation<NativeStackNavigationProp<RetailyStackParams>>();

  React.useLayoutEffect(() => {
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

  //   if (getProductData !== null) {
  //     setProducts(JSON.parse(getProductData));
  //   } else {
  //     setProducts(undefined);
  //   }
  // };

  // const getInfo = () => {
  //   console.log(products);
  // };

  // React.useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    <RequestMain>
      {/* {products && products.length > 0 ? (
        products.map((item: any) => {
          return <Text>{item.getProductData.productName}</Text>;
        })
      ) : (
        <TouchableOpacity onPress={() => getInfo()}>
          <Text>NO RESULT</Text>
        </TouchableOpacity>
      )} */}
      <Text>Hello</Text>
    </RequestMain>
  );
};

export default Request;

const RequestMain = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${variables.COLORS.white};
`;
