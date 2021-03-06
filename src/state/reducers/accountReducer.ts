import produce from 'immer';

import { AccountActionTypes, IAccountAction } from '../actions/accountActions';
import { SignInPlatformType } from '../../types';

export interface IAccountState {
  isSignedIn: boolean;
  loginStatusChecked: boolean;
  platform: SignInPlatformType;
  data: {
    name: string;
    email: string;
    picture: { uri: string };
    uid: string;
  };
}

export const initialAccountState: IAccountState = {
  isSignedIn: false,
  loginStatusChecked: false,
  platform: null,
  data: {
    name: null,
    email: null,
    picture: null,
    uid: null,
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
        draft.loginStatusChecked = true;
        draft.platform = action.payload.platform;
        break;
      }
      case AccountActionTypes.USER_DATA_UPDATED: {
        draft.data.name = action.payload.name;
        draft.data.picture = action.payload.picture;
        draft.data.uid = action.payload.uid;
        break;
      }
      case AccountActionTypes.SIGN_OUT_SUCCEEDED: {
        draft.data = initialAccountState.data;
        draft.isSignedIn = false;
        draft.loginStatusChecked = true;
        draft.platform = null;
        break;
      }
      case AccountActionTypes.SIGN_OUT_FAILED: {
        break;
      }
      case AccountActionTypes.CHECK_LOGIN_STATUS_SUCCEEDED: {
        draft.isSignedIn = !!action.payload.user;
        draft.loginStatusChecked = true;
        draft.platform = null;
        break;
      }
      default:
        break;
    }
  });
}
