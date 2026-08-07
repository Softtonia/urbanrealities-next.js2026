importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCIZQWjJsb4yG38QSbSp1aL1C8xAd1MD_4",
  authDomain: "real-estate-6954c.firebaseapp.com",
  projectId: "real-estate-6954c",
  storageBucket: "real-estate-6954c.firebasestorage.app",
  messagingSenderId: "1037570040827",
  appId: "1:1037570040827:web:663283655422b93964a15e",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/favicon.ico",
  });
});
