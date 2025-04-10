import React from 'react';
import { useContext } from 'react';
import { db, UserContext } from '../utility/UserContext';
import { deletePost } from '../utility/crudUtility'; // Importáljuk a deletePost függvényt
import { useState } from 'react';
import { useEffect } from 'react';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';

export const Detail = ({ ad, onClose }) => {
    const { user } = useContext(UserContext); // A bejelentkezett felhasználó lekérése ( törlés érdekében )
    const [advertiser, setAdvertiser] = useState(null);

    //UseEffectel lekérjük a hirdetésbe beleírt userID alapján az adatbázisból a hirdető adatait userSnap-el.
    useEffect(() => {
        const fetchAdvertiser = async () => {
            try {
                const userRef = doc(db, "Users", ad.userId); // Lekérjük a hirdető felhasználói adatait a Users collection bol a userId alapján
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setAdvertiser(userSnap.data()); // Hirdető adatainak tárolása
                } else {
                    console.log("A hirdető nem található.");
                }
            } catch (error) {
                console.error("Hiba a hirdető adatainak lekérésekor:", error);
            }
        };

        if (ad.userId) {
            fetchAdvertiser();
        }
    }, [ad.userId, db]);

    //A felhasználó hozzáadhatja az adott hirdetést a garázsához ID alapján
const addToGarage = async (userId, adId) => {
        try {
          const userRef = doc(db, "Users", userId);  // Felhasználó dokumentum lekérés
          await updateDoc(userRef, {
            garage: arrayUnion(adId)  // Hirdetés ID-ját a felhasználó garage mezőjéhez fűzzük
          });
          console.log("A hirdetés sikeresen hozzáadva a garázshoz");
        } catch (error) {
          console.error("Hiba történt a garázsba rakáskor:", error);
        }
      };

      //Kattintásra a garázsba kerül
    const handleAddToGarage = async () => {
        try {
            if (user) { //ellenőrizzük hogy egyáltalán be van e jelentkezve a felhasználó
                await addToGarage(user.uid, ad.id);  // Elég a felhasználó és a hirdetés id-ja
                alert('A hirdetés a garázsba került!');
                onClose(); // Amiután hozzáadódott bezárjuk a "kártyát"
            }
        } catch (error) {
            console.error("Hiba a garázsba rakáskor:", error);
        }
    };

    //Hirdetés törlése, ez abban az esetben látható hogyha a felhasználó a hirdetés tulajdonosa
    const handleDelete = async () => {
        try {
            await deletePost(ad.id); // Hirdetés törlése a Firestore-ból
            alert('A hirdetés sikeresen törölve!');
            onClose(); // Bezárjuk a részletező ablakot
        } catch (error) {
            console.error('Hiba történt a hirdetés törlésekor:', error);
            alert('Hiba történt a hirdetés törlésekor!');
        }
    };

    return (
        <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center z-50">
            <div className="bg-white p-5 shadow-lg shadow-black rounded-lg w-11/12 md:w-1/2 relative">
                <button 
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                >
                    X
                </button>
                <h2 className="text-2xl font-bold mb-4">{ad.adName}</h2>
                <img 
                    src={ad.photoURL || 'https://via.placeholder.com/150'} 
                    alt={ad.displayName}
                    className="w-full h-56 object-cover mb-4 rounded-lg"
                />
                <p className="text-gray-700 mb-2"><strong>Ár:</strong> {ad.price}</p>
                <p className="text-gray-700 mb-2"><strong>Leírás:</strong> {ad.description}</p>
                <p className="text-gray-700 mb-2"><strong>Márka:</strong> {ad.brand}</p>
                
                {advertiser && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Hirdető adatai:</h3>
                        <p className="text-gray-700"><strong>Név:</strong> {advertiser.displayName}</p>
                        <p className="text-gray-700"><strong>Email:</strong> {advertiser.email}</p>
                        <p className="text-gray-700"><strong>Telefonszám:</strong> {advertiser.phoneNumber}</p>
                    </div>
                )}

                {/* Csak akkor jelenik meg a törlés gomb, ha a hirdető userID je megegyezik a Bejelentkezett userID-vel */}
                {user && ad.userId === user.uid && (
                    <div className="mt-4">
                        <button 
                            onClick={handleDelete}
                            className="w-full bg-red-600 text-white p-2 rounded-md"
                        >
                            Hirdetés törlése
                        </button>
                    </div>
                )}

                {user &&
                <div>
                     {/* Hozzáadjak a garázshoz */}
                     <button 
                            onClick={handleAddToGarage}
                            className="w-full bg-blue-600 text-white p-2 rounded-md mt-2"
                        >
                            Hirdetés garázsba helyezése!
                        </button>
                </div>
                }
            </div>
        </div>
    );
};
