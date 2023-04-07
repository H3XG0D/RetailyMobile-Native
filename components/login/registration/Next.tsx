import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import * as variables from '../../../constants';
import {TouchableOpacity, ScrollView} from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';

const Next = () => {
  const route = useRoute();
  const {userNumber}: any = route.params;
  const number = 8 + String(userNumber);

  return <ScrollView></ScrollView>;
};

export default Next;
