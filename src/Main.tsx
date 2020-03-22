import React from 'react';
import { Container, Header, View } from 'native-base';
import { StyleSheet } from 'react-native';

import Map from './map/Map';
import FabButton from './FabButton';

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  fab: {
    backgroundColor: '#5067FF'
  },
  whatsapp: {
    backgroundColor: '#34A34F'
  },
  facebook: {
    backgroundColor: '#3B5998'
  },
  mail: {
    backgroundColor: '#DD5144'
  }
});

export default () => {
  return (
    <Container>
      <Header />
      <View style={styles.view}>
        <FabButton />
        <Map />
      </View>
    </Container>
  );
};
