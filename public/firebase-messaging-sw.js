// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCYxyLIQIKy3JnH59dE1aNikBZ3NwzPE_8",
    authDomain: "mxz-app.firebaseapp.com",
    projectId: "mxz-app",
    storageBucket: "mxz-app.firebasestorage.app",
    messagingSenderId: "997293192432",
    appId: "1:997293192432:web:6e32adb7914371ae723e35",
    measurementId: "G-4M0YCB3DD0"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('收到背景訊息: ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon.png'
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
