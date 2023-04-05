import Market from '../components/Market/Screens/Main/Market';
import MyRequest from '../components/Market/Screens/Main/MyRequest';
import Request from '../components/Market/Screens/Main/Request';
import UserProfile from '../components/Market/Screens/Main/UserProfile';
import {IRouteProps} from './RouteProp';

const bottombar: IRouteProps[] = [
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

export default bottombar;
