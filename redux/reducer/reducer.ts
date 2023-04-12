import {IQuantity, ISupplier} from './../types/types';
import {SET_ORDERS, SET_QUANTITY, SET_SUPPLIERS} from '../actions/actions';
import {IOrder} from '../types/types';

interface IInitialState {
  orders: IOrder[] | undefined;
  quantity: IQuantity;
  suppliers: ISupplier[] | undefined;
}

let initialState: IInitialState = {
  orders: [],
  quantity: {
    count: 0,
  },
  suppliers: [],
};

const mainReducer = (state = initialState, action: any): IInitialState => {
  switch (action.type) {
    case SET_ORDERS:
      return {...state, orders: action.orders};
    case SET_QUANTITY:
      return {...state, quantity: action.quantity};
    case SET_SUPPLIERS:
      return {...state, suppliers: action.suppliers};
    default:
      return state;
  }
};

export default mainReducer;
