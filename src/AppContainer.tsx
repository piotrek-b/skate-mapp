import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Main from './Main';
import Profile from './profile/Profile';
import { IState } from './state/reducers';
import Auth from './Auth';

const Stack = createStackNavigator();

export default () => {
  const isSignedIn = useSelector((state: IState) => state.account.isSignedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={isSignedIn ? 'Main' : 'Auth'}
      >
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
