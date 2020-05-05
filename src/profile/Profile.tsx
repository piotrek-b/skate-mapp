import React from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { Avatar, List, Switch, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// @ts-ignore
import me from '../../assets/me.png';

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
  return (
    <View style={styles.view}>
      <ScrollView showsVerticalScrollIndicator style={styles.container}>
        <View style={styles.flex}>
          <Avatar.Image size={100} source={me} />
          <Title style={styles.title}>Piotr Bechcicki</Title>
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
            title="Logout"
            left={() => <List.Icon icon="logout" />}
            onPress={() => navigation.goBack()}
          />
        </List.Section>
      </ScrollView>
    </View>
  );
};
