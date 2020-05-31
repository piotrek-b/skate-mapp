import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { Divider, Menu } from 'react-native-paper';
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
  onChange: (event: any) => void;
}

export default ({ error, value, onChange }: IAddImageListItemProps) => {
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
          quality: 1,
        });

        if (!result.cancelled) {
          onChange(result.uri);
        }
      }
    };

    callback();
  }, [cameraPermissionGranted, onChange]);

  return (
    <>
      <Menu
        visible={menuOpened}
        onDismiss={() => setMenuOpened(false)}
        anchor={
          <ListItem
            color={getItemColor(error, value !== '')}
            title={
              value
                ? value.split('/')[value.split('/').length - 1]
                : 'Add Image'
            }
            icon="image"
            onPress={() => setMenuOpened(true)}
          />
        }
      >
        <Menu.Item
          onPress={async () => {
            setMenuOpened(false);
            const result: any = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.cancelled) {
              onChange(result.uri);
            }
          }}
          title="Use gallery"
        />
        <Menu.Item
          onPress={async () => {
            setMenuOpened(false);

            if (!cameraPermissionGranted) {
              const { status } = await Permissions.askAsync(Permissions.CAMERA);
              if (status === 'granted') {
                setCameraPermissionGrantedStatus(true);
              }
            }

            if (cameraPermissionGranted) {
              const result: any = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });

              if (!result.cancelled) {
                onChange(result.uri);
              }
            }
          }}
          title="Use camera"
        />
        {!!value && (
          <>
            <Divider />
            <Menu.Item
              onPress={() => {
                setMenuOpened(false);
                onChange('');
              }}
              title="Delete Photo"
            />
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
