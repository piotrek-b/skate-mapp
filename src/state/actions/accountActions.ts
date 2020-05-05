import { Action } from 'redux';

export enum AccountActionTypes {
  SIGN_IN_REQUESTED = 'SIGN_IN_REQUESTED',
  SIGN_IN_SUCCEEDED = 'SIGN_IN_SUCCEEDED',
  SIGN_IN_FAILED = 'SIGN_IN_FAILED',
  SIGN_OUT_REQUESTED = 'SIGN_OUT_REQUESTED',
  SIGN_OUT_SUCCEEDED = 'SIGN_OUT_SUCCEEDED',
  SIGN_OUT_FAILED = 'SIGN_OUT_FAILED',
}

export interface ISignInRequestedAction extends Action {
  type: AccountActionTypes.SIGN_IN_REQUESTED;
  payload: string;
}

export interface ISignInSucceededAction extends Action {
  type: AccountActionTypes.SIGN_IN_SUCCEEDED;
  payload: string;
}

export interface ISignInFailedAction extends Action {
  type: AccountActionTypes.SIGN_IN_FAILED;
  payload: string;
}

export interface ISignOutRequestedAction extends Action {
  type: AccountActionTypes.SIGN_OUT_REQUESTED;
  payload: string;
}

export interface ISignOutSucceededAction extends Action {
  type: AccountActionTypes.SIGN_OUT_SUCCEEDED;
  payload: string;
}

export interface ISignOutFailedAction extends Action {
  type: AccountActionTypes.SIGN_OUT_FAILED;
  payload: string;
}

export type IAccountAction =
  | ISignInRequestedAction
  | ISignInSucceededAction
  | ISignInFailedAction
  | ISignOutRequestedAction
  | ISignOutSucceededAction
  | ISignOutFailedAction;
