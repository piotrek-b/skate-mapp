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
        draft.byId = action.payload.spots.reduce((previous, current, index) => {
          if (index === 1) {
            return {
              [previous.id]: previous,
              [current.id]: current,
            };
          }

          return {
            ...previous,
            [current.id]: current,
          };
        });
        draft.allIds = action.payload.spots.map((spot) => spot.id);
        break;
      default:
        break;
    }
  });
}
