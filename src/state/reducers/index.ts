import { combineReducers } from 'redux';
import produce from 'immer';

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

interface ICategoriesState {
  byId: any;
  ids: string[];
}

export interface IState {
  spots: ISpotsState;
  currentLocation: ICurrentLocationState;
  selected: ISelectedState;
  account: IAccountState;
  categories: ICategoriesState;
}

const initialCategoriesState = {
  byId: {
    cruzing: {
      title: 'Cruzing',
      id: 'cruzing',
    },
    downhill: {
      title: 'Downhill',
      id: 'downhill',
    },
    push: {
      title: 'Push',
      id: 'push',
    },
    freeride: {
      title: 'Freeride',
      id: 'freeride',
    },
    slalom: {
      title: 'Slalom',
      id: 'slalom',
    },
    carving: {
      title: 'Carving',
      id: 'carving',
    },
  },
  ids: ['cruzing', 'downhill', 'push', 'freeride', 'slalom', 'carving'],
};

export const initialState: IState = {
  spots: initialSpotsState,
  currentLocation: initialCurrentLocationState,
  selected: initialSelectedState,
  account: initialAccountState,
  categories: initialCategoriesState,
};

function categoriesReducer(state = initialCategoriesState) {
  return produce(state, () => {});
}

export default combineReducers({
  spots: spotsReducer,
  currentLocation: currentLocationReducer,
  selected: selectedReducer,
  account: accountReducer,
  categories: categoriesReducer,
});
