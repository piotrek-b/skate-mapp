import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import store from './src/state/store';
import Main from './src/Main';
import Profile from './src/profile/Profile';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#383d7f',
  },
};

export default () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const callback = async () => {
      await Font.loadAsync({
        // eslint-disable-next-line global-require
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        // eslint-disable-next-line global-require
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });

      setIsReady(true);
    };

    callback();
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Main"
          >
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};
