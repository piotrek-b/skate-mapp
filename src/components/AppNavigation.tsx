import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import { IState } from '../state/reducers';
import Routes, { getInitialRouteName } from '../routes';

const Stack = createStackNavigator();

export default () => {
  const isSignedIn = useSelector((state: IState) => state.account.isSignedIn);
  const loginStatusChecked = useSelector(
    (state: IState) => state.account.loginStatusChecked,
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={getInitialRouteName(loginStatusChecked, isSignedIn)}
      >
        {Routes.filter(
          (route) =>
            (loginStatusChecked && isSignedIn && route.forSignedInUser) ||
            (loginStatusChecked &&
              !isSignedIn &&
              !route.forSignedInUser &&
              route.forAnonymousUser) ||
            (!loginStatusChecked &&
              !route.forSignedInUser &&
              !route.forAnonymousUser),
        ).map((route) => (
          <Stack.Screen
            key={route.name}
            name={route.name}
            component={route.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
