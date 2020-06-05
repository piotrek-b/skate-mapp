import { Action } from 'redux';
import { User } from 'firebase';

import { SignInPlatformType } from '../../types';

export enum AccountActionTypes {
  SIGN_IN_REQUESTED = 'SIGN_IN_REQUESTED',
  SIGN_IN_SUCCEEDED = 'SIGN_IN_SUCCEEDED',
  SIGN_IN_FAILED = 'SIGN_IN_FAILED',
  SIGN_OUT_REQUESTED = 'SIGN_OUT_REQUESTED',
  SIGN_OUT_SUCCEEDED = 'SIGN_OUT_SUCCEEDED',
  SIGN_OUT_FAILED = 'SIGN_OUT_FAILED',
  CHECK_LOGIN_STATUS_REQUESTED = 'CHECK_LOGIN_STATUS_REQUESTED',
  CHECK_LOGIN_STATUS_SUCCEEDED = 'CHECK_LOGIN_STATUS_SUCCEEDED',
  CHECK_LOGIN_STATUS_FAILED = 'CHECK_LOGIN_STATUS_FAILED',
  USER_DATA_UPDATED = 'USER_DATA_UPDATED',
}

interface ISignActionPayload {
  platform?: SignInPlatformType;
}

interface ISignedInActionPayload {
  platform?: SignInPlatformType;
  user: User;
}

export interface ISignInRequestedAction extends Action {
  type: AccountActionTypes.SIGN_IN_REQUESTED;
  payload: ISignActionPayload;
}

export interface ISignInSucceededAction extends Action {
  type: AccountActionTypes.SIGN_IN_SUCCEEDED;
  payload: ISignedInActionPayload;
}

export interface ISignInFailedAction extends Action {
  type: AccountActionTypes.SIGN_IN_FAILED;
  payload: ISignActionPayload;
}

export interface ISignOutRequestedAction extends Action {
  type: AccountActionTypes.SIGN_OUT_REQUESTED;
  payload?: ISignActionPayload;
}

export interface ISignOutSucceededAction extends Action {
  type: AccountActionTypes.SIGN_OUT_SUCCEEDED;
  payload?: ISignActionPayload;
}

export interface ISignOutFailedAction extends Action {
  type: AccountActionTypes.SIGN_OUT_FAILED;
  error: true;
  payload?: ISignActionPayload;
}

export interface ICheckLoginStatusRequestedAction extends Action {
  type: AccountActionTypes.CHECK_LOGIN_STATUS_REQUESTED;
}

export interface ICheckLoginStatusSucceededAction extends Action {
  type: AccountActionTypes.CHECK_LOGIN_STATUS_SUCCEEDED;
  payload: {
    user: User | null;
  };
}

export interface ICheckLoginStatusFailedAction extends Action {
  type: AccountActionTypes.CHECK_LOGIN_STATUS_FAILED;
  error: true;
  payload: string;
}

export interface IUserDataUpdatedAction extends Action {
  type: AccountActionTypes.USER_DATA_UPDATED;
  payload: any;
}

export type IAccountAction =
  | ISignInRequestedAction
  | ISignInSucceededAction
  | ISignInFailedAction
  | ISignOutRequestedAction
  | ISignOutSucceededAction
  | ISignOutFailedAction
  | ICheckLoginStatusRequestedAction
  | ICheckLoginStatusSucceededAction
  | ICheckLoginStatusFailedAction
  | IUserDataUpdatedAction;

export function facebookSignInRequested(): ISignInRequestedAction {
  return {
    type: AccountActionTypes.SIGN_IN_REQUESTED,
    payload: {
      platform: SignInPlatformType.Facebook,
    },
  };
}
export function googleSignInRequested(): ISignInRequestedAction {
  return {
    type: AccountActionTypes.SIGN_IN_REQUESTED,
    payload: {
      platform: SignInPlatformType.Google,
    },
  };
}

export function signInSucceeded(user): ISignInSucceededAction {
  return {
    type: AccountActionTypes.SIGN_IN_SUCCEEDED,
    payload: {
      user,
    },
  };
}

export function facebookSignInSucceeded(user): ISignInSucceededAction {
  return {
    type: AccountActionTypes.SIGN_IN_SUCCEEDED,
    payload: {
      platform: SignInPlatformType.Facebook,
      user,
    },
  };
}

export function googleSignInSucceeded(user): ISignInSucceededAction {
  return {
    type: AccountActionTypes.SIGN_IN_SUCCEEDED,
    payload: {
      platform: SignInPlatformType.Google,
      user,
    },
  };
}
export function facebookSignInFailed(): ISignInFailedAction {
  return {
    type: AccountActionTypes.SIGN_IN_FAILED,
    payload: {
      platform: SignInPlatformType.Facebook,
    },
  };
}
export function googleSignInFailed(): ISignInFailedAction {
  return {
    type: AccountActionTypes.SIGN_IN_FAILED,
    payload: {
      platform: SignInPlatformType.Google,
    },
  };
}

export function signOutRequested(): ISignOutRequestedAction {
  return {
    type: AccountActionTypes.SIGN_OUT_REQUESTED,
  };
}

export function signOutSucceeded(): ISignOutSucceededAction {
  return {
    type: AccountActionTypes.SIGN_OUT_SUCCEEDED,
  };
}

export function signOutFailed(message): ISignOutFailedAction {
  return {
    type: AccountActionTypes.SIGN_OUT_FAILED,
    payload: message,
    error: true,
  };
}

export function userDataUpdated(payload): IUserDataUpdatedAction {
  return {
    type: AccountActionTypes.USER_DATA_UPDATED,
    payload,
  };
}

export function checkLoginStatusRequested(): ICheckLoginStatusRequestedAction {
  return {
    type: AccountActionTypes.CHECK_LOGIN_STATUS_REQUESTED,
  };
}

export function checkLoginStatusSucceeded(
  user,
): ICheckLoginStatusSucceededAction {
  return {
    type: AccountActionTypes.CHECK_LOGIN_STATUS_SUCCEEDED,
    payload: { user },
  };
}

export function checkLoginStatusFailed(message): ICheckLoginStatusFailedAction {
  return {
    type: AccountActionTypes.CHECK_LOGIN_STATUS_FAILED,
    error: true,
    payload: message,
  };
}
