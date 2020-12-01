importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');
//importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-firestore.js');

firebase.initializeApp({
 apiKey: 'AIzaSyCOgc7lwD0-UIsAAmmjfKBnr_dom_sLpms',
  authDomain: 'xpushmessageapp.firebaseapp.com',
  databaseURL: 'https://xpushmessageapp.firebaseio.com',
  projectId: 'xpushmessageapp',
  storageBucket: 'xpushmessageapp.appspot.com',
  messagingSenderId: '254275651395',
  appId: '1:254275651395:web:20e5f02a5f406aec3851f6',
  measurementId: 'G-PSYF8WEDRG',
});
const messaging = firebase.messaging();
const functions = firebase.functions();
//    apiKey: "AIzaSyDFXMVi6egG63Hfr7g20B8DSxX3Ob8nprw",
//   authDomain: "angfirepush1.firebaseapp.com",
//   databaseURL: "https://angfirepush1.firebaseio.com",
//   projectId: "angfirepush1",
//   storageBucket: "angfirepush1.appspot.com",
//   messagingSenderId: "684324243232",
//   appId: "1:684324243232:web:fd218139a0f4af326db945",
//   measurementId: "G-0ZCCB7BC9F"