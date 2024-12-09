importScripts('https://www.gstatic.com/firebasejs/9.6.11/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.11/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCXsQRUUnE40QREeOttYaN9so30MR9qZfw",
  authDomain: "test-579b1.firebaseapp.com",
  projectId: "test-579b1",
  storageBucket: "test-579b1.appspot.com",
  messagingSenderId: "405494851726",
  appId: "1:405494851726:web:f3a0f53a60e7c3430b01df",
  measurementId: "G-SWKDZ5890B"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // Replace with your logo
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
