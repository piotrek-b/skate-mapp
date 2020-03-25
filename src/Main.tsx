import React from 'react';
import { Container, View } from 'native-base';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Map from './map/Map';
import FabButton from './FabButton';
import { RootStackParamList } from './types';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface IFabButtonProps {
  navigation: MainScreenNavigationProp;
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  fab: {
    backgroundColor: '#5067FF',
  },
  whatsapp: {
    backgroundColor: '#34A34F',
  },
  facebook: {
    backgroundColor: '#3B5998',
  },
  mail: {
    backgroundColor: '#DD5144',
  },
});

export default ({ navigation }: IFabButtonProps) => {
  return (
    <Container>
      <View style={styles.view}>
        <FabButton onClick={() => navigation.navigate('List')} />
        <Map />
      </View>
    </Container>
  );
};
