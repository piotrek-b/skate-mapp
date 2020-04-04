import { Action } from 'redux';

import { ISpot } from '../../models';

export enum SelectedActionTypes {
  SPOT_SELECTED = 'SPOT_SELECTED',
}

export interface ISelectedSpotAction extends Action {
  type: SelectedActionTypes.SPOT_SELECTED;
  payload: ISpot;
}

export type SelectedAction = ISelectedSpotAction;

export function spotSelected(spot: ISpot): ISelectedSpotAction {
  return {
    type: SelectedActionTypes.SPOT_SELECTED,
    payload: spot,
  };
}
