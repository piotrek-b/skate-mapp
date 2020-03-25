import { applyMiddleware, createStore } from 'redux';
import epicMiddleware, { rootEpic } from './epics';

import rootReducer, { initialState } from './reducers';

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(epicMiddleware),
);

// TODO: Investigate the nature of this TS error;
// @ts-ignore
epicMiddleware.run(rootEpic);

export default store;
