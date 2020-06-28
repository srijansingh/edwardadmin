import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAymeTlp43F1u4XBmRpDdX5ZU6Io2-3YrQ",
    authDomain: "edward-3b589.firebaseapp.com",
    databaseURL: "https://edward-3b589.firebaseio.com",
    projectId: "edward-3b589",
    storageBucket: "edward-3b589.appspot.com",
    messagingSenderId: "637388504593",
    appId: "1:637388504593:web:dbe8855d14ee4579407bb0",
    measurementId: "G-TM1GCTPCFH"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;