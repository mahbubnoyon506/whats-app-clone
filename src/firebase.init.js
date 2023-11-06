
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCfrQa87EJbQiDUwhs-fBL3agj0-JSNlRQ",
    authDomain: "whatsapp-b305b.firebaseapp.com",
    projectId: "whatsapp-b305b",
    storageBucket: "whatsapp-b305b.appspot.com",
    messagingSenderId: "48890754751",
    appId: "1:48890754751:web:da72d7c62feaff64a0380a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(app)
export const database = getFirestore(app)
