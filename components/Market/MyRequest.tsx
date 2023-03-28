import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {IStackScreenProps} from '../../navigation/StackScreen';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../constants';
import Market from './Market';

const MyRequest: React.FunctionComponent<IStackScreenProps> = props => {
  const {navigation} = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Мои заявки',
      headerTitleAlign: 'left',
      headerLeft: () => <Text></Text>,
      headerTitleStyle: {fontSize: 27},
    });
  }, [navigation]);

  return (
    <MyRequestMain>
      <Text>Request</Text>
    </MyRequestMain>
  );
};

export default MyRequest;

const MyRequestMain = styled.View`
  background-color: ${variables.COLORS.white};
`;
