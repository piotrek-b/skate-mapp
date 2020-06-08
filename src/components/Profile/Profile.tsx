import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Avatar, List, Switch, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { IState } from '../../state/reducers';
import { signOutRequested } from '../../state/actions/accountActions';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
  },
  container: {
    paddingTop: 20,
  },
});

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userData = useSelector((state: IState) => state.account.data);

  if (!userData) {
    return <></>;
  }

  return (
    <View style={styles.view}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <ScrollView showsVerticalScrollIndicator style={styles.container}>
        {userData.name && userData.picture && (
          <View style={styles.flex}>
            <Avatar.Image size={100} source={{ uri: userData.picture }} />
            <Title style={styles.title}>{userData.name}</Title>
          </View>
        )}
        <List.Section>
          <List.Item
            title="Share Location"
            left={() => <List.Icon icon="crosshairs-gps" />}
            right={() => <Switch value />}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>Map</List.Subheader>
          <List.Item
            title="My Spots"
            left={() => <List.Icon icon="map-marker-plus" />}
          />
          <List.Item title="Favorites" left={() => <List.Icon icon="star" />} />
        </List.Section>
        <List.Section>
          <List.Subheader>Account</List.Subheader>
          <List.Item
            title="Settings"
            left={() => <List.Icon icon="settings" />}
          />
          <List.Item
            title="Sign Out"
            left={() => <List.Icon icon="logout" />}
            onPress={() => {
              dispatch(signOutRequested());
            }}
          />
        </List.Section>
      </ScrollView>
    </View>
  );
};
