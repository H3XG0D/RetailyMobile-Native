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

  return (
    <RequestMain>
      <Text style={{textAlign: 'center'}}>
        Quantity of products: {props.quantity?.count}
      </Text>
    </RequestMain>
  );
};

export default Request;

const RequestMain = styled.View`
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;

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
