import { findRouteGoogle, findRouteFromCurrentLocationGoogle } from './google';
import { ICoordinates } from '../models';

// TODO: iOS native maps support (?)

export const findRoute = (source: ICoordinates, target: ICoordinates) => {
  return findRouteGoogle(source, target);
};

export const findRouteFromCurrentLocation = (target: ICoordinates) => {
  return findRouteFromCurrentLocationGoogle(target);
};
