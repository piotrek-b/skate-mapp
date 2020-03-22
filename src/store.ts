import { createStore } from 'redux';

import rootReducer, { initialState } from './reducers';

const store = createStore(rootReducer, initialState);

export default store;
