import produce from 'immer';

import { IAccountAction } from '../actions/accountActions';
import { CurrentLocationAction } from '../actions/currentLocationActions';
import { SelectedAction } from '../actions/selectedActions';
import { SpotsAction } from '../actions/spotsActions';

export interface ILoadingState {
  [key: string]: boolean;
}

export const initialLoadingState: ILoadingState = {};

type Action =
  | IAccountAction
  | CurrentLocationAction
  | SelectedAction
  | SpotsAction;

export default function loadingReducer(
  state: ILoadingState = initialLoadingState,
  action: Action,
) {
  const { type } = action;
  const matches = /(.*)_(REQUESTED|SUCCEEDED|FAILED)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return produce(state, (draft) => {
    draft[requestName] = requestState === 'REQUESTED';
  });
}
