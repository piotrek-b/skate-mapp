import React, { useEffect, useState } from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import store from './src/state/store';
import AppContainer from './src/AppContainer';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#383d7f',
    accent: '#383d7f',
  },
};

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

export default () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const callback = async () => {
      await Font.loadAsync({
        // eslint-disable-next-line global-require
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        // eslint-disable-next-line global-require
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        // eslint-disable-next-line global-require
        Pacifico: require('./assets/fonts/Pacifico-Regular.ttf'),
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
        <AppContainer />
      </PaperProvider>
    </Provider>
  );
};
