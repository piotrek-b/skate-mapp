import produce from 'immer';

// @ts-ignore
import me from '../../../assets/me.png';
import { IAccountAction } from '../actions/accountActions';

export interface IAccountState {
  isSignedIn: boolean;
  token: string;
  data: {
    name: string;
    surname: string;
    email: string;
    picture: string;
  };
}

export const initialAccountState: IAccountState = {
  isSignedIn: true,
  token: null,
  data: {
    name: 'Piotr',
    surname: 'Bechcicki',
    email: 'bechciu@wp.pl',
    picture: me,
  },
};

export default function accountReducer(
  state: IAccountState = initialAccountState,
  action: IAccountAction,
) {
  return produce(state, () => {
    switch (action.type) {
      default:
        break;
    }
  });
}
