import { combineEpics, Epic } from 'redux-observable';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import { IState } from '../reducers';
import {
  AccountActionTypes,
  facebookSignInFailed,
  facebookSignInSucceeded,
  googleSignInFailed,
  googleSignInSucceeded,
  IAccountAction,
  userDataUpdated,
} from '../actions/accountActions';
import signInFacebook from '../../signInFacebook';
import { SignInPlatformType } from '../../types';
import signInGoogle from '../../signInGoogle';

const facebookSignInEpic: Epic<IAccountAction, IAccountAction, IState> = (
  action$,
) =>
  action$.pipe(
    filter(
      (action) =>
        action.type === AccountActionTypes.SIGN_IN_REQUESTED &&
        action.payload.platform === SignInPlatformType.Facebook,
    ),
    switchMap(() =>
      from(signInFacebook()).pipe(
        map((result) => {
          if (result) {
            return facebookSignInSucceeded(result.token, result.expires);
          }

          return facebookSignInFailed();
        }),
      ),
    ),
    catchError(() => of(facebookSignInFailed())),
  );
const facebookSignedInEpic: Epic<IAccountAction, IAccountAction, IState> = (
  action$,
) =>
  action$.pipe(
    filter(
      (action) =>
        action.type === AccountActionTypes.SIGN_IN_SUCCEEDED &&
        action.payload.platform === SignInPlatformType.Facebook,
    ),
    switchMap(({ payload: { token } }) =>
      ajax
        .getJSON(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,picture.type(large)`,
        )
        .pipe(
          map(({ name, picture: { data: { url: picture } } }) =>
            userDataUpdated({
              name,
              picture,
            }),
          ),
        ),
    ),
  );

const googleSignInEpic: Epic<IAccountAction, IAccountAction, IState> = (
  action$,
) =>
  action$.pipe(
    filter(
      (action) =>
        action.type === AccountActionTypes.SIGN_IN_REQUESTED &&
        action.payload.platform === SignInPlatformType.Google,
    ),
    switchMap(() =>
      from(signInGoogle()).pipe(
        map((result) => {
          if (result) {
            return googleSignInSucceeded(result.token, result.userData);
          }

          return googleSignInFailed();
        }),
      ),
    ),
    catchError(() => of(googleSignInFailed())),
  );
const googleSignedInEpic: Epic<IAccountAction, IAccountAction, IState> = (
  action$,
) =>
  action$.pipe(
    filter(
      (action) =>
        action.type === AccountActionTypes.SIGN_IN_SUCCEEDED &&
        action.payload.platform === SignInPlatformType.Google,
    ),
    map((action) =>
      userDataUpdated({
        name: action.payload.userData.name,
        picture: action.payload.userData.photoUrl,
      }),
    ),
  );

export default combineEpics(
  facebookSignInEpic,
  facebookSignedInEpic,
  googleSignInEpic,
  googleSignedInEpic,
);
