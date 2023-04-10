import {combineReducers} from '@reduxjs/toolkit';
import {ShoppingCartState} from '../types';
import shopReducer from '.';

const rootReducer = combineReducers<ShoppingCartState>({
  shop: shopReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
