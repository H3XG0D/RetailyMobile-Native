import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {IStackScreenProps} from '../../../../../navigation/StackScreen';
// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../../../../constants';
import {getCategoriesInfo} from '../../../../../api/api';
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
  const {selectShop}: any = route.params;

  const [categories, setCategories] = React.useState<any>(undefined);

  const getCategories = async () => {
    const categories = await getCategoriesInfo(
      'getcategories',
      selectShop.code,
      content.code,
    );
    setCategories(categories);
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={{height: '100%'}}>
      <ScrollView>
        <CategoriesContentContainer>
          {categories && categories.length > 0
            ? categories.map((category: any) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Products', {
                        content,
                        selectShop,
                        category,
                      })
                    }>
                    <CategoriesContentBox>
                      <CategoriesContentImages
                        source={{
                          uri:
                            category &&
                            category.images &&
                            category.images.length > 0
                              ? variables.siteUrl +
                                '/api/repo/' +
                                category.images[0]
                              : undefined,
                        }}
                      />
                      <CategoriesContentBoxTextContainer>
                        <CategoriesContentBoxText>
                          {category.name}
                        </CategoriesContentBoxText>
                      </CategoriesContentBoxTextContainer>
                    </CategoriesContentBox>
                  </TouchableOpacity>
                );
              })
            : undefined}
        </CategoriesContentContainer>
      </ScrollView>
    </View>
  );
};

export default Categories;

const CategoriesContentContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  padding: 10px 10px 10px 10px;
  /* padding: 30px 20px 20px 25px; */
`;

const CategoriesContentBox = styled.View`
  width: 165px;
  height: 120px;
  border-radius: 10px;
`;

const CategoriesContentImages = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10;
`;

const CategoriesContentBoxText = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h7};
  font-weight: ${variables.SIZES.bold};
  margin-left: 15px;
  margin-top: 5px;
`;

const CategoriesContentBoxTextContainer = styled.View`
  background-color: ${variables.COLORS.white};
  height: 40%;
  margin-top: auto;
  border-radius: 10px;
  opacity: 0.8;
`;
