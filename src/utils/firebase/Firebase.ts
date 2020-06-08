import * as firebase from 'firebase';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyCRNH90r5_T7LCHSnVUrRxSMXJzgJ-67uM',
  authDomain: 'skatemapp.firebaseapp.com',
  databaseURL: 'https://skatemapp.firebaseio.com',
  projectId: 'skatemapp',
  storageBucket: 'skatemapp.appspot.com',
};

export default class Firebase {
  static isInitialized = false;

  static init() {
    firebase.initializeApp(firebaseConfig);
    Firebase.isInitialized = true;
  }
}
