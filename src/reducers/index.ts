import { combineReducers } from 'redux';

import spotsReducer, { initialSpotsState, ISpotsState } from './spotsReducer';
import currentLocationReducer, {
  initialCurrentLocationState,
  ICurrentLocationState,
} from './currentLocationReducer';

export interface IState {
  spots: ISpotsState;
  currentLocation: ICurrentLocationState;
}

export const initialState: IState = {
  spots: initialSpotsState,
  currentLocation: initialCurrentLocationState,
};

export default combineReducers({
  spots: spotsReducer,
  currentLocation: currentLocationReducer,
});
