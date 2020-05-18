import * as Facebook from 'expo-facebook';

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

    return type === 'success'
      ? {
          token,
          expires,
        }
      : null;
  } catch ({ message }) {
    return null;
  }
}

export default signInFacebook;
