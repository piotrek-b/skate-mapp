import produce from 'immer';

import {
  SelectedAction,
  SelectedActionTypes,
} from '../actions/selectedActions';
import { ISpot } from '../../models';

export interface ISelectedState {
  spot: ISpot;
}

export const initialSelectedState: ISelectedState = {
  spot: null,
};

export default function selectedReducer(
  state: ISelectedState = initialSelectedState,
  action: SelectedAction,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SelectedActionTypes.SPOT_SELECTED:
        draft.spot = action.payload;
        break;
      default:
        break;
    }
  });
}
