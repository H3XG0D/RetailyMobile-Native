export type RootStackParams = {
  // Market Folder:
  MarketStack: RetailyStackParams;
  MyRequest: any;
  RequestContainer: any;
  UserProfile: any;

  ProductsContainer: any;
  Categories: any;
  ParentMeat: any;
  Supplier: any;
};

export type RetailyStackParams = {
  // Market Folder:
  Market: any;
  MyRequest: any;
  Request: any;
  UserProfile: any;

  ProductsContainer: any;
  Categories: any;
  ParentMeat: any;
  Supplier: any;
};

export type RetailyRootStackParams = {
  // Login Folder:
  Login: any;
  Forget: any;
  ForgetCode: any;
  ResetPassword: any;
  Code: any;
  Details: any;
  Next: any;
  Registration: any;
  LoadingScreen: any;

  // Market Folder:
  Market: any;
};
