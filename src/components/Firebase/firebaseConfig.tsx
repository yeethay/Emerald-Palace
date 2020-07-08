import * as firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBjW99VqW_fOjdU_FYF4LTKtGjVwMHL_D4',
  authDomain: 'emerald-palace.firebaseapp.com',
  databaseURL: 'https://emerald-palace.firebaseio.com',
  projectId: 'emerald-palace',
  storageBucket: 'emerald-palace.appspot.com',
  messagingSenderId: '191665058142',
  appId: '1:191665058142:web:37ced95f2e8fddad925fcf',
  measurementId: 'G-M7NVVWXQD9',
};

firebase.initializeApp(firebaseConfig);

export default firebaseConfig;
