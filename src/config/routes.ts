import {IRouteProps} from '../../navigation/RouteProp';
import Login from '../../components/login/Login';
import Registration from '../../components/login/registration/Registration';
import Code from '../../components/login/registration/Code';
import Details from '../../components/login/registration/Details';
import Next from '../../components/login/registration/Next';
import Market from '../../components/Market/Screens/Main/Market';
import Forget from '../../components/login/forget-password/Forget';
import ResetPassword from '../../components/login/forget-password/ResetPassword';
import ForgetCode from '../../components/login/forget-password/ForgetCode';
import LoadingScreen from '../../components/login/LoadingScreen';
import ParentMeat from '../../components/Market/Screens/Suppliers/ParentMeat';
import Categories from '../../components/Market/Screens/Suppliers/Categories/Categories';
import Products from '../../components/Market/Screens/Suppliers/Categories/Products/Products';
import MyRequest from '../../components/Market/Screens/Main/MyRequest';
import UserProfile from '../../components/Market/Screens/Main/UserProfile';
import Supplier from '../../components/Market/Screens/Suppliers/Supplier';
import Request from '../../components/Market/Screens/Main/Request';

const routes: IRouteProps[] = [
  {
    name: 'Login',
    component: Login,
  },
  {
    name: 'LoadingScreen',
    component: LoadingScreen,
  },
  {
    name: 'Forget',
    component: Forget,
  },
  {
    name: 'ForgetCode',
    component: ForgetCode,
  },
  {
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    name: 'Registration',
    component: Registration,
  },
  {
    name: 'Code',
    component: Code,
  },
  {
    name: 'Details',
    component: Details,
  },
  {
    name: 'Next',
    component: Next,
  },
  {
    name: 'Market',
    component: Market,
  },
  {
    name: 'Request',
    component: Request,
  },
  {
    name: 'MyRequest',
    component: MyRequest,
  },
  {
    name: 'UserProfile',
    component: UserProfile,
  },
  {
    name: 'ParentMeat',
    component: ParentMeat,
  },
  {
    name: 'Supplier',
    component: Supplier,
  },
  {
    name: 'Categories',
    component: Categories,
  },
  {
    name: 'Products',
    component: Products,
  },
];

export default routes;
