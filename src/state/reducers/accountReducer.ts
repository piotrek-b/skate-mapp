import produce from 'immer';

import { AccountActionTypes, IAccountAction } from '../actions/accountActions';
import { SignInPlatformType } from '../../types';

export interface IAccountState {
  isSignedIn: boolean;
  platform: SignInPlatformType;
  token: string;
  data: {
    name: string;
    email: string;
    picture: { uri: string };
  };
}

export const initialAccountState: IAccountState = {
  isSignedIn: false,
  platform: null,
  token: null,
  data: {
    name: null,
    email: null,
    picture: null,
  },
};

export default function accountReducer(
  state: IAccountState = initialAccountState,
  action: IAccountAction,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case AccountActionTypes.SIGN_IN_SUCCEEDED: {
        draft.isSignedIn = true;
        draft.platform = action.payload.platform;
        break;
      }
      case AccountActionTypes.USER_DATA_UPDATED: {
        draft.data.name = action.payload.name;
        draft.data.picture = action.payload.picture;
        break;
      }
      default:
        break;
    }
  });
}
