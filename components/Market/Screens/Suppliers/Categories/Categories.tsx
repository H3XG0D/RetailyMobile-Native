import React from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {IStackScreenProps} from '../../../../../navigation/StackScreen';
// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../../../../constants';
import {
  getCategoriesInfo,
  getClient,
  getShopsContract,
  getShopsInfo,
} from '../../../../../api/api';
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
  const {shops}: any = route.params;

  const [categories, setCategories] = React.useState<any>(undefined);

  const getCategories = async () => {
    const categories = await getCategoriesInfo(
      'getcategories',
      shops.code,
      content.code,
    );
    setCategories(categories);
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  return (
    <View>
      {/* <Text>Hello</Text>
      <Text>Hello 2</Text> */}

      {categories && categories.length > 0
        ? categories.map((i: any) => {
            return (
              <TouchableOpacity>
                <Image
                  source={{
                    uri:
                      i && i.images && i.images.length > 0
                        ? variables.siteUrl + '/api/repo/' + i.images[0]
                        : undefined,
                  }}
                  style={{height: 130, width: 130}}
                />
              </TouchableOpacity>
            );
          })
        : undefined}
    </View>
  );
};

export default Categories;
