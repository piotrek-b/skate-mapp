import { combineEpics, Epic } from 'redux-observable';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import firebase from 'firebase';

import { IState } from '../reducers';
import {
  AccountActionTypes,
  checkLoginStatusFailed,
  checkLoginStatusSucceeded,
  facebookSignInFailed,
  facebookSignInSucceeded,
  googleSignInFailed,
  googleSignInSucceeded,
  IAccountAction,
  signOutFailed,
  signOutSucceeded,
  userDataUpdated,
  ISignInSucceededAction,
} from '../actions/accountActions';
import signInFacebook from '../../signInFacebook';
import { SignInPlatformType } from '../../types';
import signInGoogle from '../../signInGoogle';

const facebookSignInEpic: Epic<IAccountAction, IAccountAction, IState> = (
  action$,
  state$,
) =>
  action$.pipe(
    filter(
      (action) =>
        !state$.value.account.isSignedIn &&
        action.type === AccountActionTypes.SIGN_IN_REQUESTED &&
        action.payload.platform === SignInPlatformType.Facebook,
    ),
    switchMap(() =>
      from(signInFacebook()).pipe(
        map(({ user }) => {
          if (user) {
            return facebookSignInSucceeded(user);
          }

          return facebookSignInFailed();
        }),
      ),
    ),
    catchError(() => of(facebookSignInFailed())),
  );

const googleSignInEpic: Epic<IAccountAction, IAccountAction, IState> = (
  action$,
  state$,
) =>
  action$.pipe(
    filter(
      (action) =>
        !state$.value.account.isSignedIn &&
        action.type === AccountActionTypes.SIGN_IN_REQUESTED &&
        action.payload.platform === SignInPlatformType.Google,
    ),
    switchMap(() =>
      from(signInGoogle()).pipe(
        map(({ user }) => {
          if (user) {
            return googleSignInSucceeded(user);
          }

          return googleSignInFailed();
        }),
      ),
    ),
    catchError(() => of(googleSignInFailed())),
  );

const signedInEpic: Epic<IAccountAction, IAccountAction, IState> = (action$) =>
  action$.pipe(
    filter(
      (action) =>
        (action.type === AccountActionTypes.SIGN_IN_SUCCEEDED ||
          action.type === AccountActionTypes.CHECK_LOGIN_STATUS_SUCCEEDED) &&
        action.payload.user !== null,
    ),
    map(({ payload: { user } }: ISignInSucceededAction) => {
      if (user.providerData[0].providerId === 'facebook.com') {
        return userDataUpdated({
          name: user.displayName,
          picture: `${user.photoURL}?type=large`,
          uid: user.uid,
        });
      }

      return userDataUpdated({
        name: user.displayName,
        picture: user.photoURL.replace('s96-c', 's400-c'),
        uid: user.uid,
      });
    }),
  );

const signOutEpic: Epic<IAccountAction, IAccountAction, IState> = (action$) =>
  action$.pipe(
    filter((action) => action.type === AccountActionTypes.SIGN_OUT_REQUESTED),
    switchMap(() =>
      from(firebase.auth().signOut()).pipe(map(() => signOutSucceeded())),
    ),
    catchError((error) => of(signOutFailed(error))),
  );

const checkLoginStatusEpic: Epic<IAccountAction, IAccountAction, IState> = (
  action$,
) =>
  action$.pipe(
    filter(
      (action) =>
        action.type === AccountActionTypes.CHECK_LOGIN_STATUS_REQUESTED,
    ),
    switchMap(() =>
      from(
        new Promise((resolve, reject) => {
          firebase.auth().onAuthStateChanged(
            (user) => resolve(user),
            (error) => reject(error),
          );
        }),
      ).pipe(
        map(
          (user) => checkLoginStatusSucceeded(user),
          catchError((error) => of(checkLoginStatusFailed(error))),
        ),
        catchError((error) => of(checkLoginStatusFailed(error))),
      ),
    ),
  );

export default combineEpics(
  checkLoginStatusEpic,
  facebookSignInEpic,
  googleSignInEpic,
  signedInEpic,
  signOutEpic,
);
