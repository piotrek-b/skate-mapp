import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import { ActivityIndicator, Title } from 'react-native-paper';
import { checkLoginStatusRequested } from './state/actions/accountActions';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 15,
  },
});

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoginStatusRequested());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.view}>
      <ActivityIndicator color="#383d7f" size="large" />
      <Title style={styles.title}>Loading....</Title>
    </View>
  );
};
