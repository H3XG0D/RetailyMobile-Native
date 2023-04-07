import React from 'react';
import {IStackScreenProps} from './StackScreen';

export interface IRouteProps {
  component: React.FunctionComponent<IStackScreenProps>;
  name: string;
}
