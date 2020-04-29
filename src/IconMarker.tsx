import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
// eslint-disable-next-line import/no-unresolved
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

const styles = StyleSheet.create({
  avatarIcon: {
    backgroundColor: '#fff',
    borderColor: '#383d7f',
    borderWidth: 1,
  },
  avatarContainer: { position: 'absolute', marginLeft: 29, marginTop: 23 },
});

// TODO: Difference in styles on Android and iOS (icon sizing).
export default ({
  icon,
  iconColor,
  markerColor,
}: {
  icon: IconSource;
  iconColor: string;
  markerColor: string;
}) => {
  return (
    <>
      <IconButton color={markerColor} size={50} icon="map-marker" />
      <View style={styles.avatarContainer}>
        <Avatar.Icon
          color={iconColor}
          size={30}
          icon={icon}
          style={{
            backgroundColor: markerColor,
            borderColor: iconColor,
            borderWidth: 1,
          }}
        />
      </View>
    </>
  );
};
