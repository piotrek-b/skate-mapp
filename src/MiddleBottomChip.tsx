import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    bottom: 50,
  },
  chip: {
    backgroundColor: '#fafafa',
  },
});

export default ({ label, onPress }: { label: string; onPress: () => void }) => {
  return (
    <View style={styles.view}>
      <Chip style={styles.chip} onPress={onPress} mode="outlined">
        {label}
      </Chip>
    </View>
  );
};
