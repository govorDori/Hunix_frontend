import React from 'react'
import { auth } from '../utility/firebaseApp'
import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, sendPasswordResetEmail, sendSignInLinkToEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { firebaseConfig } from './firebaseConfig'
import { initializeApp } from 'firebase/app'


const app = initializeApp(firebaseConfig);

export const UserContext = createContext();
export const db = getFirestore(app); //firestore referencia


const urlRedirect =/*'https://myblog-7535b.web.app/signin' */'http://localhost:5173/auth/in'

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [msg, setMsg] = useState({})//

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe()
    }, [])

    const signInUser = async (email, password) => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          setMsg({}); // Üzenet törlése
          setMsg({ signin: "Sikeres bejelentkezés!" }); // Sikeres bejelentkezés
        } catch (error) {
          // Különböző ellenőrzések
          if (error.code === 'auth/invalid-credential') {
            setMsg({ err: 'Hibás hitelesítő adatok!' });
          } else if (error.code === 'auth/user-not-found') {
            setMsg({ err: 'Felhasználó nem található!' });
          } else if (error.code === 'auth/wrong-password') {
            setMsg({ err: 'Hibás jelszó!' });
          } else {
            setMsg({ err: error.message }); // Minden egyéb hiba
          }
        }
      };

    //modified signup plusz adatokkal
    const signUpUser = async (email, password, displayName, phoneNumber, address) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName });

            const userData = {
                displayName,
                email,
                phoneNumber: phoneNumber,
                address: address || '',
                createdAt: new Date(),
                garage: [] // Tömb létrehozása ahova kerül a hirdetés id je majd !
            };

            await setDoc(doc(db, "Users", user.uid), userData);

            setMsg({ signup: "Sikeres regisztráció!" });
        } catch (error) {
            // Ha email már használatban van, külön hibaüzenet
            if (error.code === 'auth/email-already-in-use') {
                setMsg({ err: "Ez az email cím már használatban van!" });
            } else {
                setMsg({ err: error.message });
            }
        }
    };


    //Jelszó visszaállítás
    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email)
            console.log('email elküldve');

            setMsg({})//
            setMsg({ resetPW: "A jelszóvisszaállítási email elküldve!" })//
        } catch (error) {
            setMsg({ err: error.message })//
            console.log(error);

        }
    }

    //Módosítás
    const updateCredentials = async (displayName) => {
        try {
            await updateProfile(auth.currentUser, { displayName })
            setMsg({})//
            setMsg({ update: "Sikeres módosítás!" })//
        } catch (error) {
            setMsg({ err: error.message })//
        }
    }

    //Tisztább átalakítás
    const updateUser = async (displayName, photoURL) => {
        try {
          if (displayName && photoURL) {
            await updateProfile(auth.currentUser, { displayName, photoURL });
          } else if (displayName) {
            await updateProfile(auth.currentUser, { displayName });
          } else if (photoURL) {
            await updateProfile(auth.currentUser, { photoURL });
          }
      
    
          setMsg({ update: "Sikeres módosítás!" }); // Értesítés
        } catch (error) {
          setMsg({ err: error.message });
        }
      };


      //Fiók törlése
    const deleteAccount = async () => {
        try {
            await deleteUser(auth.currentUser)
            console.log("Törölve");

        } catch (error) {
            console.log(error);

        }
    }

    //Kijelentkezés
    const logoutUser = async () => {
        await signOut(auth)
        setMsg({})//
    }

   
    

    return (

        <UserContext.Provider value={{db,
            user, signInUser, logoutUser, 
            signUpUser, msg, setMsg, resetPassword, updateCredentials, updateUser, deleteAccount
        }}>
            {children}
        </UserContext.Provider>

    )
}