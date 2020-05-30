import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import AddSpotHeader from './items/AddSpotHeader';
import AddLocationListItem from './items/AddLocationListItem';
import AddCategoriesListItem from './items/AddCategoriesListItem';
import AddImageListItem from './items/AddImageListItem';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    marginTop: 50,
  },
});

export default () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  // const [categories, setCategories] = useState([]);
  const [image, setImage] = useState('');

  return (
    <View style={[styles.view, styles.container]}>
      <View>
        <AddSpotHeader
          value={title}
          onChange={({ nativeEvent }) => setTitle(nativeEvent.text)}
        />
        <Divider />
        <AddLocationListItem value={location} onChange={setLocation} />
        <Divider />
        <AddCategoriesListItem />
        <Divider />
        <AddImageListItem value={image} onChange={setImage} />
      </View>
    </View>
  );
};
