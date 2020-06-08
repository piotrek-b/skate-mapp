import React from 'react';
import { Button } from 'react-native-paper';
import { Dimensions, View, StyleSheet } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  buttons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
  },
  button: {
    marginLeft: 2.5,
    marginRight: 2.5,
    width: (Dimensions.get('window').width - 10) / 2,
  },
});

interface IBottomButtonsProps {
  leftProps: any;
  rightProps: any;
}

export default ({ leftProps, rightProps }: IBottomButtonsProps) => {
  const insets = useSafeArea();
  return (
    <View style={[styles.buttons, { bottom: insets.bottom }]}>
      <Button mode="outlined" style={styles.button} {...leftProps}>
        Clear
      </Button>
      <Button style={styles.button} mode="contained" {...rightProps}>
        Save
      </Button>
    </View>
  );
};
