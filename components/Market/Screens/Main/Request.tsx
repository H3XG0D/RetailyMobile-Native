import {Text, View} from 'react-native';
import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../../../constants';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../src/config/routes';

import BottomTabNav from './BottomTabNav';

const Request = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

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
      <BottomTabNav />
    </RequestMain>
  );
};

export default Request;

const RequestMain = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${variables.COLORS.white};
`;
