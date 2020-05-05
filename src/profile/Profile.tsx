import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { Avatar, List, Switch, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { IState } from '../state/reducers';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    marginTop: Dimensions.get('window').height / 2 - 260,
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
  },
});

export default () => {
  const navigation = useNavigation();
  const userData = useSelector((state: IState) => state.account.data);

  if (!userData) {
    return <></>;
  }

  return (
    <View style={styles.view}>
      <ScrollView showsVerticalScrollIndicator style={styles.container}>
        <View style={styles.flex}>
          <Avatar.Image size={100} source={userData.picture} />
          <Title style={styles.title}>
            {userData.name} {userData.surname}
          </Title>
        </View>
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
            onPress={() => navigation.goBack()}
          />
        </List.Section>
      </ScrollView>
    </View>
  );
};
