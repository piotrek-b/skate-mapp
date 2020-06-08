import { IState } from '../reducers';

const createLoadingSelector = (actions = []) => (state: IState) => {
  return actions.some((action) => state.loading[action]);
};

export default createLoadingSelector;
