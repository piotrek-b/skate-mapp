import * as Facebook from 'expo-facebook';

import { APP_NAME, FacebookData } from './consts';

async function signInFacebook() {
  try {
    await Facebook.initializeAsync(FacebookData.APP_ID, APP_NAME);
    const { type, ...data } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // @ts-ignore
      // args: expires, permissions, declinedPermissions
      const { token } = data;
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,picture.type(large)`,
      );
      const responseJson = await response.json();
      alert(JSON.stringify(responseJson));
    } else {
      alert(`Cancelled Facebook Sign In`);
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}

export default signInFacebook;
