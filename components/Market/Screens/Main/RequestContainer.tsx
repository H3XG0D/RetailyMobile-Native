import {Text, View} from 'react-native';
import React, {ReactElement} from 'react';

import {connect} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IOrder, IQuantity} from '../../../../redux/types/types';
import {RootStackParams} from '../../../../src/config/routes';
import {AppStateType} from '../../../../redux/reducer/store';
import {mainActions} from '../../../../redux/actions/actions';
import Products from '../Suppliers/Categories/Products/Products';
import Request from './Request';

interface MapStateToProps {
  orders: IOrder[] | undefined;
  quantity: IQuantity | undefined;
}

interface MapDispatchProps {
  setOrders: (orders: IOrder[] | undefined) => void;
  setQuantity: (quantity: IQuantity | undefined) => void;
}

interface OwnProps {}

interface Props extends MapStateToProps, MapDispatchProps, OwnProps {}

const RequestContainer = (props: Props): ReactElement => {
  //   const route = useRoute();

  //   const {content}: any = route.params;
  //   const {selectShop}: any = route.params; // Shop
  //   const {category}: any = route.params;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  //   React.useLayoutEffect(() => {
  //     navigation.setOptions({
  //       headerTitle: category.name,
  //       headerTitleStyle: {fontSize: 20},
  //       animation: 'fade',
  //     });
  //   }, [navigation]);

  return (
    <View>
      <Request quantity={props.quantity} />
    </View>
  );
};

let mapStateToProps = (state: AppStateType): MapStateToProps => {
  return {
    orders: state.main.orders,
    quantity: state.main.quantity,
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
})(RequestContainer);
