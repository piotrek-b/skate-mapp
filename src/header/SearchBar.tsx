import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Chip, Searchbar, Surface } from 'react-native-paper';

// @ts-ignore
import me from '../../assets/me.png';

const SearchBarStylesConsts = {
  top: 40,
  height: 50,
  width: Dimensions.get('window').width - 80,
};

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
  },
  searchBar: {
    position: 'absolute',
    top: SearchBarStylesConsts.top,
    height: SearchBarStylesConsts.height,
    width: SearchBarStylesConsts.width,
    marginLeft: 10,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  searchBarEnd: {
    position: 'absolute',
    top: SearchBarStylesConsts.top,
    left: SearchBarStylesConsts.width + 10,
    height: SearchBarStylesConsts.height,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  scrollView: {
    top: SearchBarStylesConsts.top + SearchBarStylesConsts.height + 15,
    paddingLeft: 10,
  },
  chip: {
    marginRight: 10,
  },
});

const items = [
  {
    title: 'Cruzing',
    key: 'cruzing',
  },
  {
    title: 'Downhill',
    key: 'downhill',
  },
  {
    title: 'Push',
    key: 'push',
  },
  {
    title: 'Freeride',
    key: 'freeride',
  },
  {
    title: 'Slalom',
    key: 'slalom',
  },
  {
    title: 'Carving',
    key: 'carving',
  },
];

export default () => {
  return (
    <View style={styles.view}>
      <Searchbar style={styles.searchBar} placeholder="Search" value="" />
      <Surface style={styles.searchBarEnd}>
        <Avatar.Image size={32} source={me} />
      </Surface>
      <ScrollView
        horizontal
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
      >
        {items.map(({ title, key }) => (
          <Chip key={key} style={styles.chip} icon="roller-skate">
            {title}
          </Chip>
        ))}
        <Chip icon="dots-horizontal">More</Chip>
      </ScrollView>
    </View>
  );
};
