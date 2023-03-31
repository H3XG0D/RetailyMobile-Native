import React from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {IStackScreenProps} from '../../../../navigation/StackScreen';
// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../../../constants';
import {getClient, getShopsContract, getShopsInfo} from '../../../../api/api';
import {useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const Supplier: React.FunctionComponent<IStackScreenProps> = props => {
  const {navigation} = props;

  const route = useRoute();
  const {content}: any = route.params;

  const [find, setFind] = React.useState<string>('');
  const [shops, setShops] = React.useState<any>([]);
  const [select, setSelect] = React.useState<string | undefined>(undefined);

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

  React.useEffect(() => {
    getContract();
    getContractInfo();
  }, []);

  return (
    <SuppliersMain>
      <ScrollView>
        <SupplierContent>
          <SupplierTitle>Выберите магазин</SupplierTitle>

          <SupplierFindInput
            onChangeText={setFind}
            value={find}
            placeholder="Поиск..."
          />

          {shops.map((item: any) => {
            return (
              <Pressable onPress={() => setSelect(item.code)}>
                <SupplierItemContent>
                  {item.code === select ? (
                    <SuppliersSelectView>
                      <SupplierItemText>{item.name}</SupplierItemText>
                      <SupplierItemSubtitle>
                        Инн: {item.inn}
                      </SupplierItemSubtitle>
                    </SuppliersSelectView>
                  ) : (
                    <SuppliersUnSelectView>
                      <SupplierItemText>{item.name}</SupplierItemText>
                      <SupplierItemSubtitle>
                        Инн: {item.inn}
                      </SupplierItemSubtitle>
                    </SuppliersUnSelectView>
                  )}
                </SupplierItemContent>
              </Pressable>
            );
          })}

          <TouchableOpacity>
            <SuppliersButton>
              <SuppliersButtonText>Выбрать</SuppliersButtonText>
            </SuppliersButton>
          </TouchableOpacity>
        </SupplierContent>
      </ScrollView>
    </SuppliersMain>
  );
};

export default Supplier;

const SuppliersMain = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${variables.COLORS.white};
`;

const SupplierContent = styled.View`
  gap: 10px;
`;

const SupplierTitle = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h3};
  font-weight: ${variables.SIZES.bold};

  margin-top: 15px;

  text-align: center;
`;

const SupplierFindInput = styled.TextInput`
  height: 40px;
  width: 350px;
  font-size: ${variables.SIZES.h4};
  border-width: 1px;
  background-color: ${variables.COLORS.milky};
  border-color: ${variables.COLORS.milky};
  border-radius: 6px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
`;

const SupplierItemContent = styled.View`
  margin-top: 3px;
  margin-left: 20px;
`;

const SuppliersSelectView = styled.View`
  border-color: ${variables.COLORS.primary};

  width: 335px;
  padding: 10px 5px 10px 5px;

  border-radius: 8px;

  border-bottom-width: 1px;
  border-top-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
`;

const SuppliersUnSelectView = styled.View`
  padding: 10px 5px 10px 5px;
`;

const SupplierItemText = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h7};
`;

const SupplierItemSubtitle = styled.Text`
  color: ${variables.COLORS.gray};
  font-size: ${variables.SIZES.h6};
`;

const SuppliersButton = styled.View`
  background-color: ${variables.COLORS.tertiary};
  border-radius: ${variables.SIZES.radius};
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 45px;
  margin-top: 15px;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
`;

const SuppliersButtonText = styled.Text`
  color: ${variables.COLORS.white};
  font-size: ${variables.SIZES.h6};
  font-weight: ${variables.SIZES.bold};
`;
