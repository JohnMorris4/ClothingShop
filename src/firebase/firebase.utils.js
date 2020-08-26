import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';




const config = {
    apiKey: "AIzaSyByeXabGwpNF0OPV62H-lEgEccAaPLGAv8",
    authDomain: "crown-clothing-db-5c034.firebaseapp.com",
    databaseURL: "https://crown-clothing-db-5c034.firebaseio.com",
    projectId: "crown-clothing-db-5c034",
    storageBucket: "crown-clothing-db-5c034.appspot.com",
    messagingSenderId: "479070670526",
    appId: "1:479070670526:web:73e3ecc8cbc986d56398ef",
    measurementId: "G-E888PWZMP3"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//google auth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;







