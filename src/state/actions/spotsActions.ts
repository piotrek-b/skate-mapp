import { Action } from 'redux';

import { ISpot } from '../../models';

export enum SpotsActionTypes {
  LOAD_SPOTS_REQUESTED = 'LOAD_SPOTS_REQUESTED',
  LOAD_SPOTS_SUCCEEDED = 'LOAD_SPOTS_SUCCEEDED',
  LOAD_SPOTS_FAILED = 'LOAD_SPOTS_FAILED',
  ADD_SPOT_REQUESTED = 'ADD_SPOT_REQUESTED',
  ADD_SPOT_SUCCEEDED = 'ADD_SPOT_SUCCEEDED',
  ADD_SPOT_FAILED = 'ADD_SPOT_FAILED',
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

export interface IAddSpotRequestedAction extends Action {
  type: SpotsActionTypes.ADD_SPOT_REQUESTED;
  payload: ISpot;
}
export interface IAddSpotSucceededAction extends Action {
  type: SpotsActionTypes.ADD_SPOT_SUCCEEDED;
  payload: ISpot;
}
export interface IAddSpotFailedAction extends Action {
  type: SpotsActionTypes.ADD_SPOT_FAILED;
  error: true;
  payload?: any;
}

export type SpotsAction =
  | ILoadSpotsRequestedAction
  | ILoadSpotsSucceededAction
  | ILoadSpotsFailedAction
  | IAddSpotRequestedAction
  | IAddSpotSucceededAction
  | IAddSpotFailedAction;

export function loadSpotsRequested(): ILoadSpotsRequestedAction {
  return {
    type: SpotsActionTypes.LOAD_SPOTS_REQUESTED,
  };
}

export function loadSpotsSucceeded(spots: ISpot[]): ILoadSpotsSucceededAction {
  return {
    type: SpotsActionTypes.LOAD_SPOTS_SUCCEEDED,
    payload: {
      spots,
    },
  };
}

export function loadSpotsFailed(): ILoadSpotsFailedAction {
  return {
    type: SpotsActionTypes.LOAD_SPOTS_FAILED,
    error: true,
  };
}

export function addSpotRequested(spot: ISpot): IAddSpotRequestedAction {
  return {
    type: SpotsActionTypes.ADD_SPOT_REQUESTED,
    payload: spot,
  };
}

export function addSpotSucceeded(spot: ISpot): IAddSpotSucceededAction {
  return {
    type: SpotsActionTypes.ADD_SPOT_SUCCEEDED,
    payload: spot,
  };
}

export function addSpotFailed(error): IAddSpotFailedAction {
  return {
    type: SpotsActionTypes.ADD_SPOT_FAILED,
    payload: error,
    error: true,
  };
}
