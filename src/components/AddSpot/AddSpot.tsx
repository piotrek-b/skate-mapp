import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Divider, Snackbar } from 'react-native-paper';

import AddSpotHeader from './items/AddSpotHeader';
import AddLocationListItem from './items/AddLocationListItem';
import AddCategoriesListItem from './items/AddCategoriesListItem';
import AddImageListItem from './items/AddImageListItem';
import BottomButtons from '../shared/BottomButtons';
import { addSpotRequested } from '../../state/actions/spotsActions';
import { IState } from '../../state/reducers';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  buttons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    marginLeft: 2.5,
    marginRight: 2.5,
    width: (Dimensions.get('window').width - 10) / 2,
  },
});

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [snackbarIsVisible, setSnackbarVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState('');
  const spotsIds = useSelector((state: IState) => state.spots.allIds);
  const uid = useSelector((state: IState) => state.account.data.uid);

  return (
    <View style={styles.view}>
      <View>
        <AddSpotHeader
          error={error && title === ''}
          value={title}
          onChange={({ nativeEvent }) => setTitle(nativeEvent.text)}
        />
        <Divider />
        <AddLocationListItem
          error={error && (!location.latitude || !location.longitude)}
          value={location}
          onChange={setLocation}
        />
        <Divider />
        <AddCategoriesListItem
          error={error && categories.length === 0}
          value={categories}
          onChange={setCategories}
        />
        <Divider />
        <AddImageListItem
          error={error && image === ''}
          value={image}
          onChange={setImage}
        />
      </View>
      <BottomButtons
        leftProps={{
          onPress: () => {
            setTitle('');
            setLocation({ latitude: 0, longitude: 0 });
            setCategories([]);
            setImage('');
          },
        }}
        rightProps={{
          disabled: error,
          onPress: () => {
            if (
              !error &&
              (title === '' ||
                !location.latitude ||
                !location.longitude ||
                categories.length === 0 ||
                image.length === 0)
            ) {
              setError(true);
              setSnackbarVisibility(true);
            } else {
              dispatch(
                addSpotRequested({
                  author: uid,
                  id: `${spotsIds.length}`,
                  name: title,
                  latitude: location.latitude,
                  longitude: location.longitude,
                  matching: categories,
                  imageUrl: image,
                }),
              );
              navigation.goBack();
            }
          },
        }}
      />
      <Snackbar
        action={{
          label: 'Hide',
          onPress: () => setSnackbarVisibility(false),
        }}
        onDismiss={() => setSnackbarVisibility(false)}
        visible={snackbarIsVisible}
      >
        All fields need to be filled.
      </Snackbar>
    </View>
  );
};
