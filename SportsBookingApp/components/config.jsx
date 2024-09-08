// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // import firebase from 'firebase/compat/firebase';
// import {getDatabase} from "firebase/database";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAHLG9yMPIPmLQZXPasnpxuT0KOF3Odn9g",
//   authDomain: "clubtime-6d38e.firebaseapp.com",
//   projectId: "clubtime-6d38e",
//   storageBucket: "clubtime-6d38e.appspot.com",
//   messagingSenderId: "964866903740",
//   appId: "1:964866903740:web:07d2954ae3e97d80a30ab9",
//   measurementId: "G-7MCE4238FL"
// };

// // Initialize Firebase
// // if(firebaseConfig.apps.length === 0){
// //   firebaseConfig.initializeApp(firebaseConfig);
// // }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// //Initialize database
// export const db = getDatabase(app);











// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";
 import {getDatabase} from "firebase/database";
 import { initializeAuth, getAuth, onAuthStateChanged, getReactNativePersistence} from "firebase/auth";
 import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

 import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configurationD
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHLG9yMPIPmLQZXPasnpxuT0KOF3Odn9g",
  authDomain: "clubtime-6d38e.firebaseapp.com",
  databaseURL: "https://clubtime-6d38e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "clubtime-6d38e",
  storageBucket: "clubtime-6d38e.appspot.com",
  messagingSenderId: "964866903740",
  appId: "1:964866903740:web:07d2954ae3e97d80a30ab9",
  measurementId: "G-7MCE4238FL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const firestoredb = getFirestore(app); //TO access the firestore
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const auth = getAuth(app);