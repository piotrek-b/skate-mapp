import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider, Menu, useTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import ListItem from './ListItem';
import getItemColor from '../getItemColor';

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').width / 4) * 3,
    marginBottom: 10,
  },
  singleItem: {
    width: Dimensions.get('window').width,
    display: 'flex',
    marginBottom: 15,
  },
});

interface IAddImageListItemProps {
  error?: boolean;
  value: string;
}

const getImagePrettyName = (uri) => {
  const uglyName = uri.split('/')[uri.split('/').length - 1];
  const extension = uglyName.split('.')[uglyName.split('.').length - 1];

  return `Cover.${extension}`;
};

export default ({ error, value }: IAddImageListItemProps) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [menuOpened, setMenuOpened] = useState(false);
  const [cameraPermissionGranted, setCameraPermissionGrantedStatus] = useState(
    false,
  );

  useEffect(() => {
    const callback = async () => {
      if (cameraPermissionGranted) {
        const result: any = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.3,
        });

        if (!result.cancelled) {
          navigation.setParams({
            imageUri: result.uri,
          });
        }
      }
    };

    callback();
  }, [cameraPermissionGranted, navigation]);

  const onUseGalleryPress = useCallback(() => {
    const callback = async () => {
      setMenuOpened(false);
      const result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.3,
      });

      if (!result.cancelled) {
        navigation.setParams({
          imageUri: result.uri,
        });
      }
    };

    callback();
  }, [navigation]);

  const onUseCameraPress = useCallback(() => {
    const callback = async () => {
      setMenuOpened(false);

      if (!cameraPermissionGranted) {
        const { status } = await Permissions.askAsync(
          Permissions.CAMERA,
          Permissions.CAMERA_ROLL,
        );
        if (status === 'granted') {
          setCameraPermissionGrantedStatus(true);
        }
      }

      if (cameraPermissionGranted) {
        const result: any = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.3,
        });

        if (!result.cancelled) {
          navigation.setParams({
            imageUri: result.uri,
          });
        }
      }
    };

    callback();
  }, [cameraPermissionGranted, navigation]);

  const onDeletePhotoPress = useCallback(() => {
    setMenuOpened(false);
    navigation.setParams({
      imageUri: '',
    });
  }, [navigation]);

  return (
    <>
      <Menu
        visible={menuOpened}
        onDismiss={() => setMenuOpened(false)}
        anchor={
          <ListItem
            color={getItemColor(error, value !== '', theme)}
            title={value ? getImagePrettyName(value) : 'Add Image'}
            icon="image"
            onPress={() => setMenuOpened(true)}
          />
        }
      >
        <Menu.Item onPress={onUseGalleryPress} title="Use gallery" />
        <Menu.Item onPress={onUseCameraPress} title="Use camera" />
        {!!value && (
          <>
            <Divider />
            <Menu.Item onPress={onDeletePhotoPress} title="Delete Photo" />
          </>
        )}
      </Menu>
      {!value && <Divider />}
      {!!value && (
        <View style={styles.singleItem}>
          <Image
            source={{
              uri: value,
            }}
            style={styles.image}
          />
          <Divider />
        </View>
      )}
    </>
  );
};
