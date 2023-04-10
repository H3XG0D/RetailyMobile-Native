import {ShoppingAction} from '../actions/index';
import {ShoppingCartState, ShoppingItem, Product} from '../types/index';

import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  DECREASE_PRODUCT,
} from '../actions/actionTypes';
import {Reducer} from 'redux';

const initialState: ShoppingCartState = {
  items: [],
  total: 0,
};
export default function shopReducer(
  state = initialState,
  action: any,
): ShoppingCartState {
  const {items, total} = state;
  const {payload, type} = action;

  switch (type) {
    case ADD_PRODUCT:
      const newShoppingItem: ShoppingItem = {
        name: payload.product.name,
        price: payload.product.price,
        quantity: 1,
      };

      let newItems: ShoppingItem[] = state.items;

      //check if any
      if (items.some(item => item.name == newShoppingItem.name)) {
        items.find(item => item.name == newShoppingItem.name)!.quantity += 1;
      } else {
        newItems = items.concat(newShoppingItem);
      }

      const newTotal = total + newShoppingItem.price;

      return {
        ...state,
        items: newItems,
        total: +(Math.round(newTotal * 100) / 100).toFixed(2),
      };
    case DECREASE_PRODUCT:
      const decreasedShoppingItem: ShoppingItem = {
        name: payload.product.name,
        price: payload.product.price,
        quantity: payload.product.quantity,
      };

      let newDecreasedTotal = total;

      if (decreasedShoppingItem!.quantity > 1) {
        items.find(
          item => item.name == decreasedShoppingItem.name,
        )!.quantity -= 1;
        newDecreasedTotal = total - decreasedShoppingItem.price;
      }

      return {
        ...state,
        total: +(Math.round(newDecreasedTotal * 100) / 100).toFixed(2),
      };

    case REMOVE_PRODUCT:
      const removedItem: ShoppingItem = {
        name: payload.product.name,
        price: payload.product.price,
        quantity: payload.product.quantity,
      };

      const foundItem = items.find(item => item.name == removedItem.name);
      const filteredItems = items.filter(item => item !== foundItem);
      const newFilteredTotal = total - removedItem.quantity * removedItem.price;

      return {
        ...state,
        items: filteredItems,
        total: +(Math.round(newFilteredTotal * 100) / 100).toFixed(2),
      };
    default:
      return state;
  }
}
