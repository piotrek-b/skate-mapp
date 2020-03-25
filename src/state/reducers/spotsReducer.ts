import produce from 'immer';

import { SpotsAction, SpotsActionTypes } from '../actions/spotsActions';
import { ISpot } from '../../models';

export interface ISpotsState {
  items: ISpot[];
}

export const initialSpotsState: ISpotsState = {
  items: [],
};

export default function spotsReducer(
  state: ISpotsState = initialSpotsState,
  action: SpotsAction,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SpotsActionTypes.LOAD_SPOTS_REQUESTED:
        break;

      case SpotsActionTypes.LOAD_SPOTS_FAILED:
        draft.items = [];
        break;

      case SpotsActionTypes.LOAD_SPOTS_SUCCEEDED:
        draft.items = action.payload.spots;
        break;
      default:
        break;
    }
  });
}
