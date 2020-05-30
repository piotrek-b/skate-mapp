import React from 'react';
import { List } from 'react-native-paper';

export default () => {
  return (
    <List.Item
      title="Add Location"
      left={(props) => <List.Icon {...props} icon="map-marker" />}
    />
  );
};
