import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from '@firebase/app';

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

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
