import {IRouteProps} from '../../navigation/RouteProp';
import Login from '../../components/login/Login';
import Registration from '../../components/login/registration/Registration';
import Code from '../../components/login/registration/Code';
import Details from '../../components/login/registration/Details';
import Next from '../../components/login/registration/Next';
import Market from '../../components/Market/BottomBar/Market';
import Forget from '../../components/login/forget-password/Forget';
import ResetPassword from '../../components/login/forget-password/ResetPassword';
import ForgetCode from '../../components/login/forget-password/ForgetCode';
import LoadingScreen from '../../components/login/LoadingScreen';
import Request from '../../components/Market/BottomBar/Request';
import MyRequest from '../../components/Market/BottomBar/MyRequest';
import UserProfile from '../../components/Market/BottomBar/UserProfile';

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
];

export default routes;
