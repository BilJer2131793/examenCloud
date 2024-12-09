import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

export default function init() {
    const firebaseConfig = {
        apiKey: "AIzaSyBOZsQmJ0AD6_EPcw8-9X0lZNx8v3aHiWM",
        authDomain: "examenweb-fefcd.firebaseapp.com",
        projectId: "examenweb-fefcd",
        storageBucket: "examenweb-fefcd.firebasestorage.app",
        messagingSenderId: "369796436198",
        appId: "1:369796436198:web:455a422a56283274de6b27",
        measurementId: "G-C41MD4ZH2S"
      };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

  // Only run service worker registration on the client side
  if (typeof window !== "undefined" && 'serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker successfully registered:', registration);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }

  return [auth, messaging];
}
