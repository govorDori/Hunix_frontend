import React, { useState, useEffect } from 'react';
import { db } from '../utility/UserContext'; // Firebase db importálása
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const UserAds = ({ userId, onAdSelect }) => {
    const [userAds, setUserAds] = useState([]);
    const navigate = useNavigate();

    // Hirdetések lekérése
    const fetchUserAds = async () => {
        try {
            const adsQuery = query(collection(db, "Ads"), where("userId", "==", userId));
            const querySnapshot = await getDocs(adsQuery);
            let adsList = [];
            querySnapshot.forEach((doc) => {
                adsList.push({ id: doc.id, ...doc.data() });
            });
            setUserAds(adsList);
        } catch (error) {
            console.error("Hirdetések betöltése sikertelen:", error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUserAds(); // Hirdetések lekérése useEffecttel
        }
    }, [userId]);

    //Módosítás gomb kezelése
    const handleEdit = (ad) => {
        navigate(`/update/${ad.id}`, { state: { ad } }); // Átadjuk az ad objektumot a navigációval
    };

    return (
        <div className="gap-1 sm:grid grid-cols-2">
            {userAds.length === 0 ? (
                <p>Nincsenek hirdetéseid.</p>
            ) : (
                userAds.map((ad) => (
                    <div key={ad.id} className="border rounded-md border-gray-300 w-full p-2 mb-1">
                        <h1 className="text-2xl font-bold">Hirdetés neve: <span className="text-green-400">{ad.adName}</span></h1>
                        <h2 className='break-words'>{ad.description}</h2>
                        <div className="gap-x-3 flex flex-wrap">
                            {/* Megtekintés gomb */}
                            <button
                                onClick={() => onAdSelect(ad)}
                                className="mt-2 h-max p-2.5 rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center">
                                Megtekintés
                            </button>
                            <button
                                onClick={() => handleEdit(ad)}
                                className="mt-2 h-max p-2.5 rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center"
                            >
                                Módosítás
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default UserAds;
