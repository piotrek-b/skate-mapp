import { Action } from 'redux';

export enum SelectedActionTypes {
  SPOT_SELECTED = 'SPOT_SELECTED',
}

export interface ISelectedSpotAction extends Action {
  type: SelectedActionTypes.SPOT_SELECTED;
  payload: string;
}

export type SelectedAction = ISelectedSpotAction;

export function spotSelected(spotId): ISelectedSpotAction {
  return {
    type: SelectedActionTypes.SPOT_SELECTED,
    payload: spotId,
  };
}
