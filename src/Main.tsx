import React from 'react';
import { Container, View } from 'native-base';
import { StyleSheet } from 'react-native';

import Map from './map/Map';
import BottomPanel from './BottomPanel';
import SelectedSpotCard from './SelectedSpotCard';
import Header from './header/Header';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default () => {
  return (
    <Container>
      <View style={styles.view}>
        <Map />
        <Header />
        <SelectedSpotCard />
        <BottomPanel />
      </View>
    </Container>
  );
};
