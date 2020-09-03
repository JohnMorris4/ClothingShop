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

export const createUserProfileDoc = async (userAuth, additionalData) => {
    if(!userAuth) return;

    // console.log(firestore.doc(`users/${userAuth.uid}`))
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();


        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (err) {
            console.log('error', err.message);
        }
    }

    return userRef;

}

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) =>{
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });
    console.log(transformedCollection)
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//google auth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;







