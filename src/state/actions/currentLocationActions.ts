import { Action } from 'redux';

import { ICoordinates } from '../../models';

export enum CurrentLocationActionTypes {
  CURRENT_LOCATION_CHANGED = 'CURRENT_LOCATION_CHANGED',
  CURRENT_LOCATION_FOLLOW_REQUESTED = 'CURRENT_LOCATION_FOLLOW_REQUESTED',
  CURRENT_LOCATION_UNFOLLOW_REQUESTED = 'CURRENT_LOCATION_UNFOLLOW_REQUESTED',
}

export interface ICurrentLocationChangedAction extends Action {
  type: CurrentLocationActionTypes.CURRENT_LOCATION_CHANGED;
  payload: ICoordinates;
}

export interface ICurrentLocationFollowRequestedAction extends Action {
  type: CurrentLocationActionTypes.CURRENT_LOCATION_FOLLOW_REQUESTED;
}

export interface ICurrentLocationUnFollowRequestedAction extends Action {
  type: CurrentLocationActionTypes.CURRENT_LOCATION_UNFOLLOW_REQUESTED;
}

export type CurrentLocationAction =
  | ICurrentLocationChangedAction
  | ICurrentLocationFollowRequestedAction
  | ICurrentLocationUnFollowRequestedAction;

export function currentLocationChanged(
  payload: ICoordinates,
): ICurrentLocationChangedAction {
  return {
    type: CurrentLocationActionTypes.CURRENT_LOCATION_CHANGED,
    payload,
  };
}

export function currentLocationFollowRequested(): ICurrentLocationFollowRequestedAction {
  return {
    type: CurrentLocationActionTypes.CURRENT_LOCATION_FOLLOW_REQUESTED,
  };
}

export function currentLocationUnFollowRequested(): ICurrentLocationUnFollowRequestedAction {
  return {
    type: CurrentLocationActionTypes.CURRENT_LOCATION_UNFOLLOW_REQUESTED,
  };
}
