import React from 'react';
import { useContext } from 'react';
import { db, UserContext } from '../utility/UserContext';
import { deletePost } from '../utility/crudUtility'; // Importáljuk a deletePost függvényt
import { useState } from 'react';
import { useEffect } from 'react';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { IoMdClose } from "react-icons/io";
import { FaCarAlt } from 'react-icons/fa';
import { PiEngineFill } from "react-icons/pi";
import { IoPersonCircle } from "react-icons/io5";

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
            <div className="bg-white p-5 shadow-lg shadow-black/40 rounded-lg w-11/12 md:w-150 relative">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-2 cursor-pointer text-red-500  flex text-center items-center rounded-full"
                >
                    <IoMdClose className='size-7' />

                </button>
                <h2 className="text-2xl font-bold mb-4 break-words">Hirdetés neve: {ad.adName}</h2>
                <img
                    src={ad.photoUrl[0] || 'https://via.placeholder.com/150'}
                    alt={ad.displayName}
                    className="w-full h-56 object-cover mb-4 rounded-lg"
                />
                <div className='flex flex-wrap gap-x-10 justify-between p-2'>
                    <div>
                        <p className="text-gray-700 mb-2 text-xl"><strong>Ár:</strong> <span className='text-green-700 text-2xl font-bold'>{ad.price}</span> </p>
                        <p className="text-gray-700 mb-2 break-words whitespace-break-spaces"><strong>Leírás:</strong> {ad.description}</p>
                        <h1 className='italic text-green-700 font-bold text-xl flex items-center gap-2'><FaCarAlt className='size-5' /> Autó adatai</h1>
                        <p className="text-gray-700 mb-2"><strong>Márka:</strong> {ad.brand}</p>
                        <p className="text-gray-700 mb-2"><strong>Modell:</strong> {ad.model}</p>
                    </div>
                    <div>
                        <h1 className='italic text-green-700 font-bold text-xl flex items-center gap-2'><PiEngineFill className='size-5' /> Motor adatai</h1>
                        <p className="text-gray-700 mb-2"><strong>Hengerűrtartalom:</strong> {ad.engineSize} <span className=' font-semibold italic'>cm³</span></p>
                        <p className="text-gray-700 mb-2 "><strong>Teljesítmény:</strong> {ad.horsePower} <span className=' font-semibold italic'>LE</span></p>
                        <p className="text-gray-700 mb-1"><strong>Kihasználtság:</strong> <span className='italic'>{ad.wear}</span></p>
                    </div>
                </div>

                <hr className='w-full mt-1 mb-1 text-green-700/30' />

                {advertiser && (
                    <div className="mt-1 ">
                        <h3 className=" font-bold italic text-xl flex items-center text-green-700 gap-1"><IoPersonCircle className='size-5' />Hirdető adatai:</h3>
                        <p className="text-gray-700"><strong>Név:</strong> {advertiser.displayName}</p>
                        <p className="text-gray-700"><strong>Email:</strong> {advertiser.email}</p>
                        <p className="text-gray-700"><strong>Telefonszám:</strong> {advertiser.phoneNumber}</p>
                    </div>
                )}

                {!advertiser && (
                    <div>A hirdető adatai nem találhatóak!</div>
                )}

                <hr className='w-full mt-1 mb-1 text-green-700/30' />

                <div className='grid items-center w-full justify-center sm:grid-cols-2 gap-2 mt-2'>
                    {/* Csak akkor jelenik meg a törlés gomb, ha a hirdető userID je megegyezik a Bejelentkezett userID-vel */}
                    {user && ad.userId === user.uid && (

                        <button
                            onClick={handleDelete}
                            className="w-full sm:w-60 text-sm mx-auto bg-red-500 pr-6 font-semibold tracking-wider pl-6 text-white p-2 rounded-md"
                        >
                            Hirdetés törlése
                        </button>

                    )}

                    {user &&
                        <div>
                            {/* Hozzáadjak a garázshoz */}
                            <button
                                onClick={handleAddToGarage}
                                className="w-full sm:w-max text-sm mx-auto bg-green-700 pr-6 font-semibold tracking-wider pl-6 text-white p-2 rounded-md"
                            >
                                Hirdetés garázsba helyezése!
                            </button>
                        </div>
                    }</div>
            </div>
        </div>
    );
};
