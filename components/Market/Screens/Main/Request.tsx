import {Text, View} from 'react-native';
import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../../../constants';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  RetailyStackParams,
  RootStackParams,
} from '../../../../src/config/routes';

const Request = () => {
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

  return (
    <RequestMain>
      <Text>Корзина</Text>
    </RequestMain>
  );
};

export default Request;

const RequestMain = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${variables.COLORS.white};
`;
