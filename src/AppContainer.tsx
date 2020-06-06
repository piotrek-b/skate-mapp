import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Main from './Main';
import Profile from './profile/Profile';
import { IState } from './state/reducers';
import Auth from './Auth';
import AddSpot from './addSpot/AddSpot';
import AddLocationMap from './addSpot/views/AddLocationMap';
import AddCategories from './addSpot/views/AddCategories';
import Loading from './Loading';

const Stack = createStackNavigator();

export default () => {
  const isSignedIn = useSelector((state: IState) => state.account.isSignedIn);
  const loginStatusChecked = useSelector(
    (state: IState) => state.account.loginStatusChecked,
  );
  let children = null;
  let initialRouteName = null;

  if (loginStatusChecked && isSignedIn) {
    console.log('Signed in');
    children = (
      <>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="AddSpot" component={AddSpot} />
        <Stack.Screen name="AddLocationMap" component={AddLocationMap} />
        <Stack.Screen name="AddCategories" component={AddCategories} />
        <Stack.Screen name="Profile" component={Profile} />
      </>
    );
    initialRouteName = 'Main';
  } else if (loginStatusChecked && !isSignedIn) {
    console.log('Not signed in');
    children = (
      <>
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Main" component={Main} />
      </>
    );
    initialRouteName = 'Auth';
  } else {
    console.log('Loading');
    children = (
      <>
        <Stack.Screen name="Loading" component={Loading} />
      </>
    );
    initialRouteName = 'Loading';
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={initialRouteName}
      >
        {children}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
