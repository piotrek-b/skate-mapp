import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    marginBottom: 30,
  },
  input: { width: Dimensions.get('window').width - 50 },
  singleItem: {
    width: Dimensions.get('window').width,
    display: 'flex',
    marginBottom: 15,
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleInput: {
    zIndex: 0,
    marginTop: -50,
    paddingLeft: 35,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    fontSize: 20,
  },
});

interface IAddSpotHeaderProps {
  value: string;
  onChange: (event: any) => void;
}

export default ({ value, onChange }: IAddSpotHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.singleItem}>
      <View
        style={[
          styles.singleItem,
          styles.column,
          { width: Dimensions.get('window').width - 10, zIndex: 1 },
        ]}
      >
        <View>
          <IconButton icon="close" onPress={() => navigation.goBack()} />
        </View>
        <View>
          <Button mode="contained" onPress={() => navigation.goBack()}>
            Save
          </Button>
        </View>
      </View>
      <TextInput
        underlineColor="rgba(255, 255, 255, 0)"
        style={styles.titleInput}
        placeholder="Add Title"
        value={value}
        onChange={onChange}
      />
    </View>
  );
};
