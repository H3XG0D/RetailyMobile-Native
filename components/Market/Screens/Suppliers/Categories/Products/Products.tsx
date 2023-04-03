import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {IStackScreenProps} from '../../../../../../navigation/StackScreen';
// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../../../../../constants';
import {getCategoriesInfo, getProductsInfo} from '../../../../../../api/api';
import {useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const Categories: React.FunctionComponent<IStackScreenProps> = props => {
  const {navigation} = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: content.name,
      headerTitleStyle: {fontSize: 20},
    });
  }, [navigation]);

  const route = useRoute();

  const {content}: any = route.params;
  const {selectShop}: any = route.params; // Shop
  const {category}: any = route.params; // Bread

  const [products, setProducts] = React.useState<any>(undefined);

  const getProducts = async () => {
    const products = await getProductsInfo(
      'getProducts',
      category.code,
      selectShop,
      content.code,
    );

    setProducts(products);
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <View style={{height: '100%'}}>
      <ScrollView>
        <Text>Hello</Text>
      </ScrollView>
    </View>
  );
};

export default Categories;
