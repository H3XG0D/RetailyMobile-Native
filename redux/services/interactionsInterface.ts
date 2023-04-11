import * as interactions from './interactions';
import {Product} from '../models/productModel';
import {ProductAdded} from '../models/productAddedModel';

export interface IncrementProduct {
  type: interactions.INCREMENT_PRODUCT;
  chosenProduct: {product: Product};
}

export interface DecrementProduct {
  type: interactions.DECREMENT_PRODUCT;
  chosenProduct: {product: Product};
}

export interface RemoveProduct {
  type: interactions.REMOVE_PRODUCT;
  chosenProduct: {product: Product};
}

export type UserInteraction =
  | IncrementProduct
  | DecrementProduct
  | RemoveProduct;

export function incrementProduct(product: Product): UserInteraction {
  return {
    type: interactions.INCREMENT_PRODUCT,
    chosenProduct: {product},
  };
}

export function decrementProduct(product: Product): UserInteraction {
  return {
    type: interactions.DECREMENT_PRODUCT,
    chosenProduct: {product},
  };
}

export function removeProduct(product: Product): UserInteraction {
  return {
    type: interactions.REMOVE_PRODUCT,
    chosenProduct: {product},
  };
}
