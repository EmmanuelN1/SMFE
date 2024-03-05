// Import the functions you need from the SDKs you need
import {  initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1FJTyul0W0iD567WwQBCmNzmcSN3Tg7c",
  authDomain: "smee-360a1.firebaseapp.com",
  projectId: "smee-360a1",
  storageBucket: "smee-360a1.appspot.com",
  messagingSenderId: "486348018358",
  appId: "1:486348018358:web:c58d84e1c95dbf14394c17",
  measurementId: "G-PKCFP4SZWY"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
export const storage = getStorage()




