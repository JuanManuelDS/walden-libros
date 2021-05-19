import firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyA9mIuN75_qjRvnk1JYJvB6VuBicWzVBBU",
    authDomain: "walden-libros.firebaseapp.com",
    projectId: "walden-libros",
    storageBucket: "walden-libros.appspot.com",
    messagingSenderId: "477979408669",
    appId: "1:477979408669:web:54e23e5ac8f206057989f4"
});

export function getFirebase () {
    return app;
}

export function getFirestore () {
    return firebase.firestore(app);
}