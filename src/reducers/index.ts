import { combineReducers } from 'redux';

import spotsReducer, { initialSpotsState, ISpotsState } from './spotsReducer';

export interface IState {
  spots: ISpotsState;
}

export const initialState: IState = {
  spots: initialSpotsState
};

export default combineReducers({
  spots: spotsReducer
});
