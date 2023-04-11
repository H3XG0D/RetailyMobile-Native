export type ProductAdded = {
  name: string;
  price: any;
  quantity: number;
  image: string;
};

export type Cart = {
  [key: string]: ProductAdded;
};

export interface CartState {
  products: ProductAdded[];
  total: number;
}
