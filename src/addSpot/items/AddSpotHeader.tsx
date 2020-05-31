import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    marginBottom: 30,
  },
  input: { width: Dimensions.get('window').width - 50 },
  singleItem: {
    width: Dimensions.get('window').width,
    display: 'flex',
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleInput: {
    zIndex: 0,
    paddingLeft: 15,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    fontSize: 20,
  },
});

interface IAddSpotHeaderProps {
  error?: boolean;
  value: string;
  onChange: (event: any) => void;
}

export default ({ error, value, onChange }: IAddSpotHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.singleItem}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Spot" />
      </Appbar.Header>
      <TextInput
        error={error}
        underlineColor="rgba(255, 255, 255, 0)"
        style={styles.titleInput}
        placeholder="Add Title"
        value={value}
        onChange={onChange}
      />
    </View>
  );
};
