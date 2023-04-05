import {IRouteProps} from './RouteProp';

import Market from '../components/Market/Screens/Main/Market';
import MyRequest from '../components/Market/Screens/Main/MyRequest';
import Request from '../components/Market/Screens/Main/Request';
import UserProfile from '../components/Market/Screens/Main/UserProfile';

import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons/faShoppingBasket';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {faCog} from '@fortawesome/free-solid-svg-icons/faCog';

const bottombar: IRouteProps[] = [
  {
    name: 'Market',
    component: Market,
    icon: {faHome},
  },
  {
    name: 'Request',
    component: Request,
    icon: {faShoppingBasket},
  },
  {
    name: 'MyRequest',
    component: MyRequest,
    icon: {faList},
  },
  {
    name: 'UserProfile',
    component: UserProfile,
    icon: {faCog},
  },
];

export default bottombar;
