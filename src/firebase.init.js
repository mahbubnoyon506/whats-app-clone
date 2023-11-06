
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBvnsaLCGL036yBhvcUDDkVWYZSudAJ7is",
    authDomain: "whatsappclone-225e8.firebaseapp.com",
    projectId: "whatsappclone-225e8",
    storageBucket: "whatsappclone-225e8.appspot.com",
    messagingSenderId: "2275233515",
    appId: "1:2275233515:web:4e6c7f333d4734dca9f8ae"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(app)
export const database = getFirestore(app)
