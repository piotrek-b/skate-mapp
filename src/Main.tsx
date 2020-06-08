import React from 'react';
import { useSelector } from 'react-redux';
import { Container, View } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

import Map from './map/Map';
import SelectedSpotCard from './SelectedSpotCard';
import createLoadingSelector from './state/loadingSelector';
import { IState } from './state/reducers';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  activityIndicatorView: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default () => {
  const theme = useTheme();
  const spotLoadingSelector = createLoadingSelector(['ADD_SPOT']);
  const spotIsBeingAdded = useSelector((state: IState) =>
    spotLoadingSelector(state),
  );

  const loadingComponent = spotIsBeingAdded ? (
    <View style={styles.activityIndicatorView}>
      <ActivityIndicator size="large" color={theme.colors.surface} />
    </View>
  ) : null;

  return (
    <Container>
      <View style={styles.view}>
        <Map />
        <SelectedSpotCard />
      </View>
      {loadingComponent}
    </Container>
  );
};
