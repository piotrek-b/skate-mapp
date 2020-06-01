import * as Google from 'expo-google-app-auth';
import { Platform } from 'react-native';

import { GoogleData } from './consts';

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
    const { type, accessToken, user } = await Google.logInAsync(config);

    return type === 'success'
      ? {
          token: accessToken,
          userData: user,
        }
      : null;
  } catch ({ message }) {
    console.log(message);
    return null;
  }
}

export default signInGoogle;
