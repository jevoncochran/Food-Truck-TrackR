import firebase from "firebase/app";
import "firebase/storage";

// allows users (both diners and operators) to upload pics to Firebase cloud storage
const firebaseConfig = {
    apiKey: "AIzaSyAgIKEtOpK0pWh4Sj04buJhDCtGUpVfqs4",
    authDomain: "food-truck-trackr-files.firebaseapp.com",
    databaseURL: "https://food-truck-trackr-files.firebaseio.com",
    projectId: "food-truck-trackr-files",
    storageBucket: "food-truck-trackr-files.appspot.com",
    messagingSenderId: "643118241801",
    appId: "1:643118241801:web:b2018620a05ebf6f1440d8",
    measurementId: "G-VJZJTEWMZ0"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export { storage, firebase as default };