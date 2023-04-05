import {IRouteProps} from './RouteProp';

import Market from '../components/Market/Screens/Main/Market';
import MyRequest from '../components/Market/Screens/Main/MyRequest';
import Request from '../components/Market/Screens/Main/Request';
import UserProfile from '../components/Market/Screens/Main/UserProfile';

const bottombar: IRouteProps[] = [
  {
    name: 'MarketBottom',
    component: Market,
  },
  {
    name: 'RequestBottom',
    component: Request,
  },
  {
    name: 'MyRequestBottom',
    component: MyRequest,
  },
  {
    name: 'UserProfileBottom',
    component: UserProfile,
  },
];

export default bottombar;
