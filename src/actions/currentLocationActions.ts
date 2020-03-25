import { Action } from 'redux';

import { ICoordinates } from '../models';

export enum CurrentLocationActionTypes {
  CURRENT_LOCATION_CHANGED = 'CURRENT_LOCATION_CHANGED',
}

export interface ICurrentLocationChangedAction extends Action {
  type: CurrentLocationActionTypes.CURRENT_LOCATION_CHANGED;
  payload: ICoordinates;
}

export type CurrentLocationAction = ICurrentLocationChangedAction;

export function currentLocationChanged(
  payload: ICoordinates,
): ICurrentLocationChangedAction {
  return {
    type: CurrentLocationActionTypes.CURRENT_LOCATION_CHANGED,
    payload,
  };
}
