import { Action } from 'redux';

import { ISpot } from '../models';

export enum SpotsActionTypes {
  LOAD_SPOTS_REQUESTED = 'LOAD_SPOTS_REQUESTED',
  LOAD_SPOTS_SUCCEEDED = 'LOAD_SPOTS_SUCCEEDED',
  LOAD_SPOTS_FAILED = 'LOAD_SPOTS_FAILED'
}

export interface ILoadSpotsRequestedAction extends Action {
  type: SpotsActionTypes.LOAD_SPOTS_REQUESTED;
}
export interface ILoadSpotsSucceededAction extends Action {
  type: SpotsActionTypes.LOAD_SPOTS_SUCCEEDED;
  payload: any;
}
export interface ILoadSpotsFailedAction extends Action {
  type: SpotsActionTypes.LOAD_SPOTS_FAILED;
  error: true;
  payload?: any;
}

export type SpotsAction =
  | ILoadSpotsRequestedAction
  | ILoadSpotsSucceededAction
  | ILoadSpotsFailedAction;

export function loadSpotsRequested(): ILoadSpotsRequestedAction {
  return {
    type: SpotsActionTypes.LOAD_SPOTS_REQUESTED
  };
}

export function loadSpotsSucceeded(spots: ISpot[]): ILoadSpotsSucceededAction {
  return {
    type: SpotsActionTypes.LOAD_SPOTS_SUCCEEDED,
    payload: {
      spots
    }
  };
}

export function loadSpotsFailed(): ILoadSpotsFailedAction {
  return {
    type: SpotsActionTypes.LOAD_SPOTS_FAILED,
    error: true
  };
}
