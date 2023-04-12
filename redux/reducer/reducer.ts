import {IQuantity} from './../types/types';
import {SET_ORDERS, SET_QUANTITY} from '../actions/actions';
import {IOrder} from '../types/types';

interface IInitialState {
  orders: IOrder[] | undefined;
  quantity: IQuantity;
}

let initialState: IInitialState = {
  orders: [],
  quantity: {
    count: 0,
  },
};

const mainReducer = (state = initialState, action: any): IInitialState => {
  switch (action.type) {
    case SET_ORDERS:
      return {...state, orders: action.orders};
    case SET_QUANTITY:
      return {...state, quantity: action.quantity};
    default:
      return state;
  }
};

export default mainReducer;
