/**
 * Firebase configuration – loaded after firebase-app-compat.js and firebase-firestore-compat.js
 * Uses your project config; Firestore is used for all form submissions.
 */
(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyC8sIL5wmKByVpR8O3lbbps5BNmxk3zSWY",
    authDomain: "mido-wos.firebaseapp.com",
    databaseURL: "https://mido-wos-default-rtdb.firebaseio.com",
    projectId: "mido-wos",
    storageBucket: "mido-wos.firebasestorage.app",
    messagingSenderId: "407415975062",
    appId: "1:407415975062:web:d4ca815cb3b44d6dc2a6b7",
    measurementId: "G-MBWXGBR1XF"
  };

  if (typeof firebase === 'undefined') {
    console.warn('Firebase SDK not loaded. Include firebase-app and firebase-firestore scripts before this file.');
    return;
  }

  try {
    firebase.initializeApp(firebaseConfig);
    window.firebaseDb = firebase.firestore();
  } catch (err) {
    console.error('Firebase init error:', err);
  }
})();
