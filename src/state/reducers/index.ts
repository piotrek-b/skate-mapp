import { combineReducers } from 'redux';

import spotsReducer, { initialSpotsState, ISpotsState } from './spotsReducer';
import currentLocationReducer, {
  initialCurrentLocationState,
  ICurrentLocationState,
} from './currentLocationReducer';
import selectedReducer, {
  initialSelectedState,
  ISelectedState,
} from './selectedReducer';

export interface IState {
  spots: ISpotsState;
  currentLocation: ICurrentLocationState;
  selected: ISelectedState;
}

export const initialState: IState = {
  spots: initialSpotsState,
  currentLocation: initialCurrentLocationState,
  selected: initialSelectedState,
};

export default combineReducers({
  spots: spotsReducer,
  currentLocation: currentLocationReducer,
  selected: selectedReducer,
});
