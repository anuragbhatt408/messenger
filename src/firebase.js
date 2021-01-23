import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDpYKy7G1EnTUeiHIGfvhbgI7Ex0PN_LNg",
    authDomain: "messenger-f7bf6.firebaseapp.com",
    projectId: "messenger-f7bf6",
    storageBucket: "messenger-f7bf6.appspot.com",
    messagingSenderId: "1025521616888",
    appId: "1:1025521616888:web:bf58847e30379ece74f80d",
    measurementId: "G-FZX9BR9V9M"
});

const db = firebaseApp.firestore();

export default db ;