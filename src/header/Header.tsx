import React from 'react';
import { Button, H3, Icon } from 'native-base';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  view: {
    top: 30,
    width: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  header: {
    color: '#fff',
  },
});

export default () => {
  return (
    <View style={styles.view}>
      <Button icon transparent light>
        <Icon name="ios-menu" android="md-menu" ios="ios-menu" />
      </Button>
      <H3 style={styles.header}>SPOTS NEAR YOU</H3>
      <Button icon transparent light>
        <Icon name="ios-options" android="md-options" ios="ios-options" />
      </Button>
    </View>
  );
};
