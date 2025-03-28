import { initializeApp } from "firebase/app"
import { firebaseConfig } from "./firebaseConfig.js"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const app = initializeApp(firebaseConfig)

export const dataBase=getFirestore(app)
export const auth=getAuth(app)