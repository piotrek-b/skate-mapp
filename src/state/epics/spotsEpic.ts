import { combineEpics, Epic } from 'redux-observable';
import { map, catchError, filter, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import firebase from 'firebase';

import { IState } from '../reducers';
import {
  loadSpotsSucceeded,
  loadSpotsFailed,
  SpotsActionTypes,
  SpotsAction,
  addSpotSucceeded,
  addSpotFailed,
} from '../actions/spotsActions';
import uploadImage from '../../utils/firebase/uploadImage';
import { ISpot } from '../../models';

const loadSpotsEpic: Epic<SpotsAction, SpotsAction, IState> = (action$) =>
  action$.pipe(
    filter(isOfType(SpotsActionTypes.LOAD_SPOTS_REQUESTED)),
    switchMap(() =>
      from(firebase.database().ref(`/spots`).once('value')).pipe(
        map((snapshot: any) => snapshot.val()),
      ),
    ),
    map((data) => {
      return loadSpotsSucceeded(data);
    }),
    catchError(() => of(loadSpotsFailed())),
  );

const addSpotEpic: Epic<SpotsAction, SpotsAction, IState> = (action$) =>
  action$.pipe(
    filter(isOfType(SpotsActionTypes.ADD_SPOT_REQUESTED)),
    switchMap((action) => {
      const imageUri = action.payload.imageUrl;

      return from(uploadImage(action.payload.id, imageUri)).pipe(
        switchMap((imageDownloadURL: string) => {
          const spot: ISpot = {
            id: action.payload.id,
            author: action.payload.author,
            name: action.payload.name,
            imageUrl: imageDownloadURL,
            matching: action.payload.matching,
            latitude: action.payload.latitude,
            longitude: action.payload.longitude,
          };
          return from(
            firebase.database().ref(`/spots/${action.payload.id}`).set(spot),
          ).pipe(map(() => spot));
        }),
      );
    }),
    map((data) => {
      return addSpotSucceeded(data);
    }),
    catchError((error) => of(addSpotFailed(error))),
  );

export default combineEpics(loadSpotsEpic, addSpotEpic);
