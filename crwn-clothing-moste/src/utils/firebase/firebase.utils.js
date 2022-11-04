// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgYegcELY2SdviMsChYKhhLhJrDeP5HJM",
  authDomain: "crwn-clothing-db-mustafah.firebaseapp.com",
  projectId: "crwn-clothing-db-mustafah",
  storageBucket: "crwn-clothing-db-mustafah.appspot.com",
  messagingSenderId: "496272731597",
  appId: "1:496272731597:web:05f90b97dcd2d3bbc12884",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
//project-496272731597
export const auth = getAuth();

export const signInWitGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUsrerDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.error("error creating the user", error.message);
    }
  }

  return userDocRef;
};
