import React from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {IStackScreenProps} from '../../../../../../navigation/StackScreen';
// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../../../../../constants';
import {
  getClient,
  getShopsContract,
  getShopsInfo,
} from '../../../../../../api/api';
import {useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const Products: React.FunctionComponent<IStackScreenProps> = props => {
  const {navigation} = props;

  const route = useRoute();
  const {content}: any = route.params;

  const [shops, setShops] = React.useState<any>([]);
  const [select, setSelect] = React.useState<string | undefined>(undefined);

  const [search, setSearch] = React.useState<any>('');

  const getContract = async () => {
    const contract = await getShopsContract('check', content.code);
  };

  const getContractInfo = async () => {
    const info = await getShopsInfo('getShops', content.code);
    setShops(info);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: content.name,
      headerTitleStyle: {fontSize: 20},
    });
  }, [navigation]);

  return <Text>Hello</Text>;
};

export default Products;
