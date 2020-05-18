import { Action } from 'redux';

import { SignInPlatformType } from '../../types';

export enum AccountActionTypes {
  SIGN_IN_REQUESTED = 'SIGN_IN_REQUESTED',
  SIGN_IN_SUCCEEDED = 'SIGN_IN_SUCCEEDED',
  SIGN_IN_FAILED = 'SIGN_IN_FAILED',
  SIGN_OUT_REQUESTED = 'SIGN_OUT_REQUESTED',
  SIGN_OUT_SUCCEEDED = 'SIGN_OUT_SUCCEEDED',
  SIGN_OUT_FAILED = 'SIGN_OUT_FAILED',
  USER_DATA_UPDATED = 'USER_DATA_UPDATED',
}

interface ISignActionPayload {
  platform: SignInPlatformType;
}

interface ISignedInActionPayload {
  platform: SignInPlatformType;
  token: string;
  expires?: string;
  userData?: any;
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
  payload: ISignActionPayload;
}

export interface ISignOutSucceededAction extends Action {
  type: AccountActionTypes.SIGN_OUT_SUCCEEDED;
  payload: ISignActionPayload;
}

export interface ISignOutFailedAction extends Action {
  type: AccountActionTypes.SIGN_OUT_FAILED;
  payload: ISignActionPayload;
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

export function facebookSignInSucceeded(
  token,
  expires,
): ISignInSucceededAction {
  return {
    type: AccountActionTypes.SIGN_IN_SUCCEEDED,
    payload: {
      platform: SignInPlatformType.Facebook,
      token,
      expires,
    },
  };
}

export function googleSignInSucceeded(token, data): ISignInSucceededAction {
  return {
    type: AccountActionTypes.SIGN_IN_SUCCEEDED,
    payload: {
      platform: SignInPlatformType.Google,
      token,
      userData: data,
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

export function userDataUpdated(payload): IUserDataUpdatedAction {
  return {
    type: AccountActionTypes.USER_DATA_UPDATED,
    payload,
  };
}
