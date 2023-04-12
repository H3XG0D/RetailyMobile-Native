export interface IShop {
  code: string;
  name: string;
  ord: number | null;
  visible: boolean;
  country: string | null;
  region: string | null;
  city: string | null;
  street: string | null;
  house: string | null;
  customer: string;
  address: string | null;
  hasContact: boolean;
  inn: string | null;
}

export interface IOrderProduct {
  product: string;
  quantity: number;
  price: number;
  quantum: number | undefined;
  step: number | undefined;
  // balance: number | undefined;
  // ei: string | undefined;
  // properties: IApiOrderProductProperty[];
  // comment: string | undefined;
}

export interface IQuantity {
  count: any;
}

export interface IApiOrderProductProperty {
  property: string;
  code: string;
}

export interface ISupplier {
  code: string;
  name: string;
  ord: number;
  tags: string[] | undefined;
  phone_support: string | undefined;
  phone_contract: string | undefined;
  hasContractOnline: boolean;
  hasPaymentChoice: boolean;
  parent_code: string | null;
  type: string | null;
  description: string | null;
  add_shops: boolean;
}

export interface IOrder {
  supplier: string;
  shop: string;
  products: IOrderProduct[];
}

export interface IProduct {
  code: string;
  category: string;
  category_sub: string | undefined;
  name: string;
  quantum: number | undefined;
  step: number;
  visible: boolean | undefined;
  supplier: string;
  ord: number | undefined;
  description: string | undefined;
  description_short: string | undefined;
  price: number | undefined;
  images: [string];
  balance: number | null;
  ei: string | null;
  properties1: IProductProperty1[];
  properties2: IProductProperty2[];
}

export interface IProductProperty1 {
  code: string;
  name: string;
  value: string | null;
}

export interface IProductProperty2 {
  code: string;
  name: string;
  values: IProductProperty2Value[];
}

export interface IProductProperty2Value {
  code: string;
  name: string;
}
