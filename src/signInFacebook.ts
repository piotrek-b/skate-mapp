import * as Facebook from 'expo-facebook';
import firebase from 'firebase';

import { APP_NAME, FacebookData } from './consts';

async function signInFacebook() {
  try {
    await Facebook.initializeAsync(FacebookData.APP_ID, APP_NAME);
    const {
      type,
      // @ts-ignore
      token,
      // @ts-ignore
      expires,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });

    if (type === 'success') {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase.auth().signInWithCredential(credential);
      return {
        token,
        expires,
      };
    }

    return null;
  } catch ({ message }) {
    return null;
  }
}

export default signInFacebook;
