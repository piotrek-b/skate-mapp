import { combineEpics, createEpicMiddleware } from 'redux-observable';

import spotsEpic from './spotsEpic';
import accountEpic from './accountEpic';

export const rootEpic = combineEpics(accountEpic, spotsEpic);

export default createEpicMiddleware();
