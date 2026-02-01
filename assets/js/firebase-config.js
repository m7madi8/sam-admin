/**
 * Firebase configuration – loaded after firebase-app-compat.js and firebase-firestore-compat.js
 * Uses your project config; Firestore is used for all form submissions.
 *
 * أمان: مفتاح API هنا ظاهر في الواجهة (معتاد في Firebase). حمّ بياناتك عبر:
 * - قواعد أمان Firestore صارمة (اقرأ فقط/اكتب فقط حسب الحاجة).
 * - في Firebase Console: قيّد مفتاح الويب بالنطاقات المسموحة (API key restrictions).
 */
(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyC8sIL5wmKByVpR8O3lbbps5BNmxk3zSWY",
    authDomain: "mido-wos.firebaseapp.com",
    databaseURL: "https://mido-wos-default-rtdb.firebaseio.com",
    projectId: "mido-wos",
    storageBucket: "mido-wos.firebasestorage.app",
    messagingSenderId: "407415975062",
    appId: "1:407415975062:web:1341fe0e1b23cf80c2a6b7",
    measurementId: "G-31QE91Y4YD"
  };

  if (typeof firebase === 'undefined') {
    console.warn('Firebase SDK not loaded. Include firebase-app and firebase-firestore scripts before this file.');
    return;
  }

  try {
    if (!firebase.apps || !firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    window.firebaseDb = firebase.firestore();
  } catch (err) {
    console.error('Firebase init error:', err);
  }
})();
