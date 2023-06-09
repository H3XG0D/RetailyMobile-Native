import {Text, View} from 'react-native';
import React from 'react';

// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../../../constants';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RetailyStackParams} from '../../../../src/config/routes';

const MyRequest = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RetailyStackParams>>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Мои заявки',
      headerTitleAlign: 'left',
      headerLeft: () => <Text></Text>,
      headerTitleStyle: {fontSize: 27, fontWeight: '700'},
      animation: 'none',
    });
  }, [navigation]);

  return (
    <MyRequestMain>
      <Text>Мои заявки</Text>
    </MyRequestMain>
  );
};

export default MyRequest;

const MyRequestMain = styled.View`
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;

  background-color: ${variables.COLORS.white};
`;
