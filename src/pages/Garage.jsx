import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../utility/UserContext';
import { db } from '../utility/UserContext'; // Firebase db
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Detail } from '../components/Detail';

export const Garage = () => {
    const { user } = useContext(UserContext); // A bejelentkezett felhasználó lekérése
    const [garageAds, setGarageAds] = useState([]); // A felhasználó garázsában lévő hirdetések
    const navigate = useNavigate();
    const [selectedAd, setSelectedAd] = useState(null); // kiválasztott hirdetés
    const [isDetailVisible, setIsDetailVisible] = useState(false); //Detail panel megjelenítése

    // Ha nincs bejelentkezve visszadobjuk a HOME page-re.
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user]);

    useEffect(() => {
        const fetchGarageAds = async () => {
            if (user) {
                try {
                    // Lekérjük a felhasználó adatokat, hogy megtudjuk, mik a mentett hirdetései
                    const userRef = doc(db, "Users", user.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        const garage = userSnap.data().garage || []; // A 'garage' mezőből szedjük ki a mentett hirdetéseket

                        if (garage.length > 0) {
                            // Lekérjük a hirdetéseket az 'ads' collection-ből a mentett adatok alapján
                            const adsQuery = query(
                                collection(db, "Ads"),
                                where("__name__", "in", garage) // Azonosító alapján kéri le a hirdetéseket
                            );
                            const querySnapshot = await getDocs(adsQuery);
                            const ads = querySnapshot.docs.map(doc => doc.data()); //adatok kinyerése
                            setGarageAds(ads); // Seteljük a hirdetéseket
                        }
                    }
                } catch (error) {
                    console.error("Hiba történt a hirdetések lekérésekor:", error);
                }
            }
        };

        fetchGarageAds(); // Lekérjük a hirdetéseket a komponens betöltésekor
    }, [user]);

    //Törlés a garázsból hirdetés ID alapján
    const deleteFromGarage = async (adId) => {
        try {
            const userRef = doc(db, 'Users', user.uid); // A felhasználó dokumentumának lekérése
            await updateDoc(userRef, {
                garage: arrayRemove(adId) // Eltávolítjuk az adId-t a garage tömbből a firestore-ban
            });
    
            // Ha sikerült
            alert('A hirdetés törölve lett a garázsból!');
        } catch (error) {
            console.error('Hiba történt a garázsban tárolt jármű törléskor:', error);
            alert('Hiba történt a garázs törléskor!');
        }
    };

    //Handle meghivása
    const handleDelete = (adId) => {
        deleteFromGarage(adId); // Meghívjuk a törlés funkciót (nem müködik még mivel az adId nincs lekérve!)
    };

//Kiválasztott hirdetés kártyájának megjelentíése
const handleAdSelect = (ad) => {
    setSelectedAd(ad); // Kiválasztott hirdetés beállítása
    setIsDetailVisible(true); // Detail panel megjelenítése
};

    console.log(garageAds);


    // Ha a felhasználó nem mentett hirdetést, akkor azt jelezzük
    if (!garageAds.length) {
        return (
            <div className="shadow-[#7C7979] md:h-full md:w-full min-w-[10%] max-w-[100%] mx-auto shadow-md p-4 rounded-lg bg-white space-y-2">
                <h1 className="tracking-wide text-xl">Garázsod</h1>
                <p className="text-[#939393] mt-[-10px]">Nincsenek mentett hirdetéseid</p>
            </div>
        );
    }

    return (
        <div className="shadow-[#7C7979] md:h-full md:w-full min-w-[10%] max-w-[100%] mx-auto shadow-md p-4 rounded-lg bg-white space-y-2">
            <div className="md:h-full md:w-full min-w-[10%] max-w-[100%] mx-auto rounded-lg bg-white space-y-2">
                <h1 className="tracking-wide text-xl">Garázsod</h1>
                <p className="text-[#939393] mt-[-10px]">Általad mentett hirdetések</p>

                <div className="gap-1 sm:grid grid-cols-3">
                    {garageAds.map((ad, index) => (
                        <div key={index} className="border rounded-md border-gray-300 w-full p-2">
                            <h1 className="text-2xl font-bold">Auto neve: <span className="text-green-400">{ad.adName}</span></h1>
                            <img
                                src={ad.photoURL || "https://via.placeholder.com/150"}
                                className="rounded-xl object-cover mt-2 mb-2 shadow-md shadow-black/30"
                                alt={ad.adName}
                            />
                            <p className="text-gray-400 break-words">{ad.description}</p>
                            <h2>Lóerő: {ad.horsepower}</h2>
                            <h2>Ár: {ad.price} Ft</h2>

                            <button
                            onClick={() => handleAdSelect(ad)}
                            className="mt-2 w-full h-max p-2.5 rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center">
                                Megtekintés
                            </button>

                            <button
                            onClick={() => handleDelete(adId)}
                            className="mt-2 w-full h-max p-2.5 rounded-sm pl-6 pr-6 bg-red-500 font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center">
                                Törlés
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {/* Detail panel megjelenítése, ha kiválasztottunk egy hirdetést */}
            {isDetailVisible && selectedAd && (
                <Detail ad={selectedAd} onClose={() => setIsDetailVisible(false)} />
            )}
        </div>

    );
};
