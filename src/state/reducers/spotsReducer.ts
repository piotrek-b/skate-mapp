import produce from 'immer';

import { SpotsAction, SpotsActionTypes } from '../actions/spotsActions';
import { ISpot } from '../../models';

interface NormalizedObjects<T> {
  byId: { [id: string]: T };
  allIds: string[];
}

export type ISpotsState = NormalizedObjects<ISpot>;

export const initialSpotsState: ISpotsState = {
  byId: {},
  allIds: [],
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
        draft.byId = {};
        draft.allIds = [];
        break;
      case SpotsActionTypes.LOAD_SPOTS_SUCCEEDED:
        draft.byId = action.payload.spots.reduce(
          (previous, current) => ({
            ...previous,
            [current.id]: current,
          }),
          {},
        );
        draft.allIds = action.payload.spots.map((spot) => spot.id);
        break;
      case SpotsActionTypes.ADD_SPOT_SUCCEEDED:
        draft.byId[action.payload.id] = action.payload;
        draft.allIds.push(action.payload.id);
        break;
      case SpotsActionTypes.ADD_SPOT_FAILED:
        console.log(action);
        break;
      default:
        break;
    }
  });
}
