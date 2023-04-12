import {IOrderProduct, IQuantity, ISupplier} from './../types/types';
import {InferActionsTypes, AppStateType} from '../reducer/store';
import {ThunkAction} from 'redux-thunk';
import {IOrder} from '../types/types';

export const SET_ORDERS = 'SET_ORDERS';
export const SET_QUANTITY = 'SET_QUANTITY';
export const SET_SUPPLIERS = 'SET_SUPPLIERS';

type ActionTypes = InferActionsTypes<typeof mainActions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const mainActions = {
  setOrders: (orders: IOrder[] | undefined) => ({type: SET_ORDERS, orders}),
  setQuantity: (quantity: IQuantity | undefined) => ({
    type: SET_QUANTITY,
    quantity,
  }),
  setSuppliers: (suppliers: ISupplier[] | undefined) => ({
    type: SET_SUPPLIERS,
    suppliers,
  }),
};
