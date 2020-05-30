import React from 'react';
import { List } from 'react-native-paper';

import Longboard from '../../Longboard';

export default () => {
  return (
    <List.Item
      title="Add Categories"
      left={(props) => (
        <List.Icon
          {...props}
          icon={({ color, size }) => (
            <Longboard color={color} width={size} height={size} />
          )}
        />
      )}
    />
  );
};
