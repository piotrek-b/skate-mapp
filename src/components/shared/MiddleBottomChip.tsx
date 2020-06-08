import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    bottom: 50,
  },
});

export default ({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) => {
  const theme = useTheme();
  return (
    <View style={styles.view}>
      <Chip
        style={{ backgroundColor: theme.colors.background }}
        onPress={onPress}
        mode="outlined"
      >
        {label}
      </Chip>
    </View>
  );
};
