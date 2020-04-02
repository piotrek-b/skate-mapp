import React from 'react';
import { Icon, Fab } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  locationButton: {
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 9999,
  },
  locationButtonIcon: {
    color: '#888',
  },
});

export default () => {
  return (
    <Fab
      active={false}
      direction="up"
      style={styles.locationButton}
      position="bottomRight"
    >
      <Icon
        name="md-locate"
        android="md-locate"
        ios="ios-locate"
        style={styles.locationButtonIcon}
      />
    </Fab>
  );
};
