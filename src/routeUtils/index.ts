import { Platform } from 'react-native';

import { findRouteApple, findRouteFromCurrentLocationApple } from './apple';
import { findRouteGoogle, findRouteFromCurrentLocationGoogle } from './google';
import { ICoordinates } from '../models';

export const findRoute = (source: ICoordinates, target: ICoordinates) => {
  return Platform.OS === 'ios'
    ? findRouteApple(source, target)
    : findRouteGoogle(source, target);
};

export const findRouteFromCurrentLocation = (target: ICoordinates) => {
  return Platform.OS === 'ios'
    ? findRouteFromCurrentLocationApple(target)
    : findRouteFromCurrentLocationGoogle(target);
};
