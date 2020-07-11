import * as firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }
}

export default Firebase;
