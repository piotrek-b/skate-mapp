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
import accountReducer, {
  initialAccountState,
  IAccountState,
} from './accountReducer';

export interface IState {
  spots: ISpotsState;
  currentLocation: ICurrentLocationState;
  selected: ISelectedState;
  account: IAccountState;
}

export const initialState: IState = {
  spots: initialSpotsState,
  currentLocation: initialCurrentLocationState,
  selected: initialSelectedState,
  account: initialAccountState,
};

export default combineReducers({
  spots: spotsReducer,
  currentLocation: currentLocationReducer,
  selected: selectedReducer,
  account: accountReducer,
});
