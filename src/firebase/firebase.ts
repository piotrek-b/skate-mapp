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
  static auth;

  static database;

  static storage;

  static functions;

  static EmailAuthProvider;

  static isInitialized = false;

  static init() {
    if (!Firebase.isInitialized) {
      firebase.initializeApp(firebaseConfig);

      Firebase.auth = firebase.auth();
      Firebase.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

      Firebase.EmailAuthProvider = firebase.auth.EmailAuthProvider;

      Firebase.database = firebase.database();

      Firebase.storage = firebase.storage();

      Firebase.functions = firebase.functions();

      Firebase.isInitialized = true;
    }
  }
}
