import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  customMarkerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customMarker: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '45deg' }],
    borderWidth: 1,
  },
  childrenContainer: {
    transform: [{ rotate: '-45deg' }],
  },
});

export default ({
  children,
  markerColor,
  borderColor,
  markerSize,
}: {
  children: React.ReactNode;
  markerColor: string;
  borderColor: string;
  markerSize: number;
}) => {
  return (
    <View
      style={[
        styles.customMarkerContainer,
        {
          width: markerSize * 2,
          height: markerSize * 2,
        },
      ]}
    >
      <View
        style={[
          styles.customMarker,
          {
            width: markerSize,
            height: markerSize,
            borderColor,
            borderTopLeftRadius: markerSize / 2,
            borderTopRightRadius: markerSize / 2,
            borderBottomLeftRadius: markerSize / 2,
            backgroundColor: markerColor,
          },
        ]}
      >
        <View style={styles.childrenContainer}>{children}</View>
      </View>
    </View>
  );
};
