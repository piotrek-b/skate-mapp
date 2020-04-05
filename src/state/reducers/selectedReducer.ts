import produce from 'immer';

import {
  SelectedAction,
  SelectedActionTypes,
} from '../actions/selectedActions';

export interface ISelectedState {
  spotId: string;
}

export const initialSelectedState: ISelectedState = {
  spotId: null,
};

export default function selectedReducer(
  state: ISelectedState = initialSelectedState,
  action: SelectedAction,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SelectedActionTypes.SPOT_SELECTED:
        draft.spotId = action.payload;
        break;
      default:
        break;
    }
  });
}
