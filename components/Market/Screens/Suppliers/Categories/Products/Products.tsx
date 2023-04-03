import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {IStackScreenProps} from '../../../../../../navigation/StackScreen';
// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../../../../../constants';
import {getProductsInfo} from '../../../../../../api/api';
import {useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons/faClose';

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
  const [info, setInfo] = React.useState<any>(undefined);

  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);

  const getProducts = async () => {
    const products = await getProductsInfo(
      'getProducts',
      category.code,
      selectShop,
      content.code,
    );

    setProducts(products);
  };

  const showModal = () => {
    setModalVisible(!isModalVisible);
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
                  <TouchableOpacity
                    onPress={() => showModal()}
                    onPressIn={() => setInfo(product)}>
                    <ProductsContentBoxTextContainer>
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

                          <TouchableOpacity>
                            <ProductsContentBoxPriceContainer>
                              <ProductsContentBoxPriceText>
                                {product.price} ₽
                              </ProductsContentBoxPriceText>
                            </ProductsContentBoxPriceContainer>
                          </TouchableOpacity>
                        </ProductsContentBox>
                      </ProductsContentOutsideBox>
                    </ProductsContentBoxTextContainer>
                  </TouchableOpacity>
                );
              })
            : undefined}
        </ProductsContentContainer>
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.4}
        style={{
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            maxHeight: 1100 - 10,
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 15,
            marginTop: 50,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={() => showModal()}>
              <FontAwesomeIcon
                icon={faClose}
                size={28}
                style={{
                  marginLeft: 'auto',
                  marginRight: 20,
                  marginTop: 15,
                }}></FontAwesomeIcon>
            </TouchableOpacity>

            <ProductsModalImage
              source={{
                uri:
                  info && info.images && info.images.length > 0
                    ? variables.siteUrl + '/api/repo/' + info.images[0]
                    : undefined,
              }}
            />

            <ProductsModalContent>
              <ProductsModalHeader>
                <ProductsModalTitle>{info?.name}</ProductsModalTitle>
                <View style={{alignItems: 'center'}}>
                  <ProductsModalCost>{info?.price} ₽</ProductsModalCost>
                  <ProductsModalSubtitleCost>
                    {info?.price} ₽
                  </ProductsModalSubtitleCost>
                </View>
              </ProductsModalHeader>
              <ProductsModalBtn>
                <ProductsModalBtnText>{info?.price} ₽</ProductsModalBtnText>
              </ProductsModalBtn>
              <ProductModalInfoContainer>
                {info?.properties1 && info?.properties1.length > 0
                  ? info.properties1.map((prop: any) => {
                      return (
                        <View>
                          <ProductModalInfoCharacteristic>
                            {prop.name}:{' '}
                            <ProductModalInfoText>
                              {prop.value}
                            </ProductModalInfoText>
                          </ProductModalInfoCharacteristic>
                        </View>
                      );
                    })
                  : undefined}
              </ProductModalInfoContainer>
            </ProductsModalContent>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

// Code.Weight: name; value, sert, storage_life, storage_cond = properties1

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

const ProductsContentBoxTextContainer = styled.View`
  background-color: ${variables.COLORS.brightgray};

  border-radius: 8px;
  margin-bottom: 15px;
`;

const ProductsModalContent = styled.View`
  background-color: ${variables.COLORS.milky};
  height: 400px;
`;

const ProductsModalImage = styled.Image`
  width: 300px;
  height: 250px;
  border-radius: 15;
  object-fit: contain;
  margin-left: auto;
  margin-right: auto;
`;

const ProductsModalHeader = styled.View`
  gap: 20px;
  margin-left: 20px;
  margin-top: 20px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ProductsModalTitle = styled.Text`
  font-size: ${variables.SIZES.h6};
  color: ${variables.COLORS.black};
  width: 235px;
`;

const ProductsModalCost = styled.Text`
  font-size: ${variables.SIZES.h5};
  font-weight: ${variables.SIZES.bold};
  color: ${variables.COLORS.forth};
`;

const ProductsModalSubtitleCost = styled.Text`
  font-size: ${variables.SIZES.h7};
  font-weight: ${variables.SIZES.bold};
  color: ${variables.COLORS.gray};
`;

const ProductsModalBtn = styled.View`
  background-color: ${variables.COLORS.tertiary};
  border-radius: ${variables.SIZES.radius};
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 45px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
`;

const ProductsModalBtnText = styled.Text`
  color: ${variables.COLORS.white};
  font-size: ${variables.SIZES.h6};
  font-weight: ${variables.SIZES.bold};
`;

const ProductModalInfoContainer = styled.View`
  margin-top: 20px;
  gap: 10px;
  margin-left: 10%;
  width: 300px;
`;

const ProductModalInfoCharacteristic = styled.Text`
  color: ${variables.COLORS.gray};
  font-size: ${variables.SIZES.h8};
`;

const ProductModalInfoText = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h8};
`;
