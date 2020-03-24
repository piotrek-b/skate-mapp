import { combineEpics, Epic } from 'redux-observable';
import { map, catchError, filter, delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { isOfType } from 'typesafe-actions';

import { IState } from '../reducers';
import {
  loadSpotsSucceeded,
  loadSpotsFailed,
  SpotsActionTypes,
  SpotsAction
} from '../actions/spotsActions';
import data from '../../assets/mock-data.json';

// TODO: Use API for this;
const loadSpotsEpic: Epic<SpotsAction, SpotsAction, IState> = (action$) =>
  action$.pipe(
    filter(isOfType(SpotsActionTypes.LOAD_SPOTS_REQUESTED)),
    delay(5000),
    map(() => loadSpotsSucceeded(data.placesMarkers)),
    catchError(() => of(loadSpotsFailed()))
  );

export default combineEpics(loadSpotsEpic);
