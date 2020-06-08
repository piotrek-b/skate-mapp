import { ComponentType } from 'react';
import Main from './components/Main/Main';
import Profile from './components/Profile/Profile';
import Auth from './components/Auth/Auth';
import AddSpot from './components/AddSpot/AddSpot';
import AddLocationMap from './components/AddSpot/views/AddLocationMap';
import AddCategories from './components/AddSpot/views/AddCategories';
import Loading from './components/Loading/Loading';

export interface IRoute {
  name: string;
  component: ComponentType;
  forSignedInUser: boolean;
  forAnonymousUser: boolean;
}

const Routes: IRoute[] = [
  {
    name: 'Loading',
    component: Loading,
    forSignedInUser: false,
    forAnonymousUser: false,
  },
  {
    name: 'Auth',
    component: Auth,
    forSignedInUser: false,
    forAnonymousUser: true,
  },
  {
    name: 'Main',
    component: Main,
    forSignedInUser: true,
    forAnonymousUser: true,
  },
  {
    name: 'Profile',
    component: Profile,
    forSignedInUser: true,
    forAnonymousUser: false,
  },
  {
    name: 'AddSpot',
    component: AddSpot,
    forSignedInUser: true,
    forAnonymousUser: false,
  },
  {
    name: 'AddLocationMap',
    component: AddLocationMap,
    forSignedInUser: true,
    forAnonymousUser: false,
  },
  {
    name: 'AddCategories',
    component: AddCategories,
    forSignedInUser: true,
    forAnonymousUser: false,
  },
];

export default Routes;

export const getInitialRouteName = (isAnonymous, isSignedIn) => {
  if (isAnonymous) {
    return 'Auth';
  }

  if (isSignedIn) {
    return 'Main';
  }

  return 'Loading';
};
