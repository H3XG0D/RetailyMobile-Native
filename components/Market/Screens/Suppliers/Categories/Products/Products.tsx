import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {IStackScreenProps} from '../../../../../../navigation/StackScreen';
// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../../../../../constants';
import {getCategoriesInfo, getProductsInfo} from '../../../../../../api/api';
import {useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const Products: React.FunctionComponent<IStackScreenProps> = props => {
  const {navigation} = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: category.name,
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
        <ProductsContentContainer>
          {products && products.length > 0
            ? products.map((product: any) => {
                return (
                  <TouchableOpacity>
                    <ProductContentBoxTextContainer>
                      <ProductsContentOutsideBox>
                        <ProductsContentBox>
                          <ProductsContentImages
                            source={{
                              uri:
                                product &&
                                product.images &&
                                product.images.length > 0
                                  ? variables.siteUrl +
                                    '/api/repo/' +
                                    product.images[0]
                                  : undefined,
                            }}
                          />
                          <ProductsContentBoxText>
                            {product.name}
                          </ProductsContentBoxText>

                          <ProductsContentBoxSubText>
                            {product.description_short}
                          </ProductsContentBoxSubText>

                          <ProductsContentBoxPriceContainer>
                            <ProductsContentBoxPriceText>
                              {product.price} ₽
                            </ProductsContentBoxPriceText>
                          </ProductsContentBoxPriceContainer>
                        </ProductsContentBox>
                      </ProductsContentOutsideBox>
                    </ProductContentBoxTextContainer>
                  </TouchableOpacity>
                );
              })
            : undefined}
        </ProductsContentContainer>
      </ScrollView>
    </View>
  );
};

export default Products;

const ProductsContentContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  padding: 5px 5px 5px 5px;
  gap: 10px;
`;

const ProductsContentOutsideBox = styled.View`
  margin-bottom: 125%;
`;

const ProductsContentBox = styled.View`
  background-color: ${variables.COLORS.white};

  width: 115px;
  height: 110px;
  border-radius: 8px;
`;

const ProductsContentImages = styled.Image`
  object-fit: contain;

  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const ProductsContentBoxText = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h9};

  height: 50%;
  margin-left: 10px;
  margin-top: 10px;
`;

const ProductsContentBoxSubText = styled.Text`
  color: ${variables.COLORS.gray};
  font-size: ${variables.SIZES.h9};

  margin-left: 10px;
  margin-top: 15px;
`;

const ProductsContentBoxPriceContainer = styled.View`
  background-color: ${variables.COLORS.white};
  font-size: ${variables.SIZES.h8};
  margin-top: 15px;

  width: 90px;
  padding: 5px;
  border-radius: 5px;

  margin-left: auto;
  margin-right: auto;
`;

const ProductsContentBoxPriceText = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h8};
  text-align: center;
`;

const ProductContentBoxTextContainer = styled.View`
  background-color: ${variables.COLORS.brightgray};

  border-radius: 8px;
  margin-bottom: 15px;
`;
