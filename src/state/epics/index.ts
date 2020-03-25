import { combineEpics, createEpicMiddleware } from 'redux-observable';
import spotsEpic from './spotsEpic';

export const rootEpic = combineEpics(spotsEpic);

export default createEpicMiddleware();
