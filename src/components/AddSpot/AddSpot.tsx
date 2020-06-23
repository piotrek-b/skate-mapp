import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Divider, Snackbar } from 'react-native-paper';

import AddSpotHeader from './items/AddSpotHeader';
import AddLocationListItem from './items/AddLocationListItem';
import AddCategoriesListItem from './items/AddCategoriesListItem';
import AddImageListItem from './items/AddImageListItem';
import BottomButtons from '../shared/BottomButtons';
import { addSpotRequested } from '../../state/actions/spotsActions';
import { IState } from '../../state/reducers';
import { RootStackParamList } from '../../types';

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

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'AddSpot'>;

interface AddSpotProps {
  route: ProfileScreenRouteProp;
}

export default ({ route }: AddSpotProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [snackbarIsVisible, setSnackbarVisibility] = useState(false);
  const spotsIds = useSelector((state: IState) => state.spots.allIds);
  const uid = useSelector((state: IState) => state.account.data.uid);

  const categories = route.params.categories || [];
  const imageUri = route.params.imageUri || '';
  const location = route.params.location || { latitude: 0, longitude: 0 };
  const title = route.params.title || '';

  const onLeftButtonPress = useCallback(() => {
    navigation.setParams({
      categories: [],
      imageUri: '',
      title: '',
      location: { latitude: 0, longitude: 0 },
    });
  }, [navigation]);
  const onRightButtonPress = useCallback(() => {
    if (
      !error &&
      (title === '' ||
        !location.latitude ||
        !location.longitude ||
        categories.length === 0 ||
        imageUri.length === 0)
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
          imageUrl: imageUri,
        }),
      );
      navigation.goBack();
    }
  }, [
    uid,
    error,
    categories,
    dispatch,
    location.latitude,
    location.longitude,
    title,
    imageUri,
    navigation,
    spotsIds.length,
  ]);

  return (
    <View style={styles.view}>
      <View>
        <AddSpotHeader error={error && title === ''} value={title} />
        <Divider />
        <AddLocationListItem
          error={error && (!location.latitude || !location.longitude)}
          value={location}
        />
        <Divider />
        <AddCategoriesListItem
          error={error && categories.length === 0}
          value={categories}
        />
        <Divider />
        <AddImageListItem error={error && imageUri === ''} value={imageUri} />
      </View>
      <BottomButtons
        leftProps={{
          onPress: onLeftButtonPress,
        }}
        rightProps={{
          disabled: error,
          onPress: onRightButtonPress,
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
