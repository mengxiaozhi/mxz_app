// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCYxyLIQIKy3JnH59dE1aNikBZ3NwzPE_8",
    authDomain: "mxz-app.firebaseapp.com",
    projectId: "mxz-app",
    storageBucket: "mxz-app.firebasestorage.app",
    messagingSenderId: "997293192432",
    appId: "1:997293192432:web:6e32adb7914371ae723e35",
    measurementId: "G-4M0YCB3DD0"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging }