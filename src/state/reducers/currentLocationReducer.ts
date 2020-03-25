import produce from 'immer';

import {
  CurrentLocationAction,
  CurrentLocationActionTypes,
} from '../actions/currentLocationActions';
import { ICoordinates } from '../../models';

export interface ICurrentLocationState {
  coordinates: ICoordinates;
}

export const initialCurrentLocationState: ICurrentLocationState = {
  coordinates: { latitude: 0, longitude: 0 },
};

export default function currentLocationReducer(
  state: ICurrentLocationState = initialCurrentLocationState,
  action: CurrentLocationAction,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case CurrentLocationActionTypes.CURRENT_LOCATION_CHANGED:
        draft.coordinates = action.payload;
        break;
      default:
        break;
    }
  });
}
