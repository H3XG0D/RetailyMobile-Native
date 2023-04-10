import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';
// ScrollView
import {ScrollView} from 'react-native-gesture-handler';

// Imports all exports from local project

import * as variables from '../../../../constants';
import {getClient} from '../../../../api/api';

// Icons
import {useNavigation, useRoute} from '@react-navigation/native';
import ParentMeatSkeleton from '../Skeletons/SuppliersSkeleton/ParentMeatSkeleton';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../src/config/routes';

const ParentMeat = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: content.name,
      headerTitleStyle: {fontSize: 20},
      animation: 'fade',
    });
  }, [navigation]);

  const [suppliers, setSuppliers] = React.useState<any>([]);
  const [loadSkeleton, setLoadSkeleton] = React.useState<boolean>(true);

  const route = useRoute();
  const {content}: any = route.params;

  const getSuppliers = async () => {
    setLoadSkeleton(true);
    const result = await getClient({cmd: 'getsuppliers'});
    setSuppliers(result);
    setLoadSkeleton(false);
  };

  React.useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <View style={{height: '100%'}}>
      <ScrollView>
        <MarketContentContainer>
          {loadSkeleton ? (
            <ParentMeatSkeleton />
          ) : (
            <>
              {suppliers?.suppliers && suppliers.suppliers.length > 0
                ? suppliers.suppliers
                    .filter((f: any) => f.parent_code == 'parent_01')
                    .map((content: any) => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('Supplier', {content})
                          }>
                          <MarketContentBoxContainer>
                            <MarketContentBox>
                              <Image
                                source={{
                                  uri:
                                    content &&
                                    content.images &&
                                    content.images.length > 0
                                      ? variables.siteUrl +
                                        '/api/repo/' +
                                        content.images[0]
                                      : undefined,
                                }}
                                style={{width: 130, height: 130}}></Image>
                              <MarketContentBoxText>
                                {content.name}
                              </MarketContentBoxText>
                            </MarketContentBox>
                          </MarketContentBoxContainer>
                        </TouchableOpacity>
                      );
                    })
                : undefined}
            </>
          )}
        </MarketContentContainer>
      </ScrollView>
    </View>
  );
};

export default ParentMeat;

// * Content

const MarketContentContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 25px;
  padding: 10px 10px 10px 15px;
  margin-top: 20px;
  margin-bottom: 90px;
  /* padding: 30px 20px 20px 25px; */
`;

const MarketContentBox = styled.View`
  width: 160px;
  height: 190px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const MarketContentBoxText = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h5};
  text-align: center;
`;

const MarketContentBoxContainer = styled.View`
  background-color: white;
  width: 160px;
  height: 200px;
  border-radius: 10px;
`;
