import {Text, View} from 'react-native';
import React, {ReactElement} from 'react';
import {AppStateType} from '../../../../../../redux/reducer/store';

import {connect} from 'react-redux';
import Products from './Products';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  IOrder,
  IQuantity,
  ISupplier,
} from '../../../../../../redux/types/types';
import {mainActions} from '../../../../../../redux/actions/actions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../../../src/config/routes';

interface MapStateToProps {
  orders: IOrder[] | undefined;
  quantity: IQuantity | undefined;
  suppliers: ISupplier[] | undefined;
}

interface MapDispatchProps {
  setOrders: (orders: IOrder[] | undefined) => void;
  setQuantity: (quantity: IQuantity | undefined) => void;
  setSuppliers: (suppliers: ISupplier[] | undefined) => void;
}

interface OwnProps {}

interface Props extends MapStateToProps, MapDispatchProps, OwnProps {}

const ProductsContainer = (props: Props): ReactElement => {
  const route = useRoute();

  const {content}: any = route.params;
  const {selectShop}: any = route.params; // Shop
  const {category}: any = route.params;
  const {choosedShop}: any = route.params;

  console.log(content);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: category.name,
      headerTitleStyle: {fontSize: 20},
      animation: 'fade',
    });
  }, [navigation]);

  return (
    <View>
      <Products
        content={content}
        selectShop={selectShop}
        category={category}
        choosedShop={choosedShop}
        quantity={props.quantity}
        orders={props.orders}
        suppliers={props.suppliers}
        setQuantity={props.setQuantity}
        setOrders={props.setOrders}
        setSuppliers={props.setSuppliers}
      />
    </View>
  );
};

let mapStateToProps = (state: AppStateType): MapStateToProps => {
  return {
    orders: state.main.orders,
    quantity: state.main.quantity,
    suppliers: state.main.suppliers,
  };
};

export default connect<
  MapStateToProps,
  MapDispatchProps,
  OwnProps,
  AppStateType
>(mapStateToProps, {
  setOrders: mainActions.setOrders,
  setQuantity: mainActions.setQuantity,
  setSuppliers: mainActions.setSuppliers,
})(ProductsContainer);
