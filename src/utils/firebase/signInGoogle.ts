import * as Google from 'expo-google-app-auth';
import { Platform } from 'react-native';
import firebase from 'firebase';

import { GoogleData } from '../../consts';

async function signInGoogle() {
  try {
    const config = {
      clientId:
        Platform.OS === 'ios'
          ? GoogleData.IOS_APP_ID
          : GoogleData.ANDROID_APP_ID,
      scopes: ['profile', 'email'],
    };
    // @ts-ignore
    const { type, accessToken, idToken } = await Google.logInAsync(config);

    if (type === 'success') {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const credential = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      const { user } = await firebase.auth().signInWithCredential(credential);
      return {
        user,
      };
    }

    return null;
  } catch ({ message }) {
    return null;
  }
}

export default signInGoogle;
