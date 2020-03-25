import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import store from './src/store';
import Main from './src/Main';
import List from './src/List';

const Stack = createStackNavigator();

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
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="List" component={List} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
