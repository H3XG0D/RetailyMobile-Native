export type Product = {
  name: string;
  price: number;
};

export type ShoppingItem = {
  name: string;
  price: number;
  quantity: number;
};

export type ShoppingCart = {
  [key: string]: ShoppingItem;
};

export interface ShoppingCartState {
  items: ShoppingItem[];
  total: number;
}
