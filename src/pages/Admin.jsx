import React, { useContext, useEffect, useState } from 'react'
import { getAds } from '../utility/crudUtility';
import { motion } from "framer-motion";
import { db, UserContext } from '../utility/UserContext';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BrandContext } from '../utility/BrandContext';

export const Admin = ({ ad }) => {
    const { user } = useContext(UserContext); // A bejelentkezett felhasználó lekérése
    const [ads, setAds] = useState([]); // Hirdetéseket tároló állapot
    const [users, setUsers] = useState([]); //Felhasználók megjelenítése
    const { brands } = useContext(BrandContext); //Márkák lekérése

    //Márkák adatainak bevitele
    const [brandName, setBrandName] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    // Hirdetések betöltése
    useEffect(() => {
        const fetchAds = async () => {
            const adsData = await getAds(); // Adatok betöltése
            setAds(adsData); // Seteljük a hirdetéseket
        };
        fetchAds();
    }, []);

    //Hirdetés törlése
    const deleteAd = async (id) => {
        try {
            await deleteDoc(doc(db, "Cars", id));
            setAds(prev => prev.filter(ad => ad.id !== id)); // frontendről is eltűnik
        } catch (err) {
            console.error("Hiba a törlésnél: ", err);
        }
    };

    //Összes felhasználói fiók lekérése
    const getAllUsers = async () => {
        const snapshot = await getDocs(collection(db, "Users"));
        const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);
    };

    //Felhasználó törlése ( nem authból, csak Firestore-ból )
    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "Users", id));
        setUsers(prev => prev.filter(user => user.id !== id)); // lista frissítés
    };

    //egy márka(brand) törlése a brands collectinbol
    const handleDeleteBrand = async (id) => {
        await deleteDoc(doc(db, "Brands", id));
        setUsers(prev => prev.filter(brands => brands.id !== id)); // lista frissítés
    };

    // Ezt hívjuk meg a form küldésekor
    const handleAddBrand = async (e) => {
        e.preventDefault() // Megakadályozza, hogy az oldal újratöltődjön a form küldésekor

        if (brandName && imageUrl) {
            try {
                // Hozzáadjuk az új brandet a Firestore adatbázishoz
                const docRef = await addDoc(collection(db, 'Brands'), {
                    name: brandName,
                    imageUrl: imageUrl,
                })
                console.log('Márka hozzáadva:', docRef.id)
                // Miután sikerült a hozzáadás, töröljük az inputokat
                setBrandName('')
                setImageUrl('')
            } catch (e) {
                console.error('Hiba a márka hozzáadásakor:', e)
            }
        } else {
            alert('Töltsd ki az összes mezőt!')
        }
    }


    //useEffect ami kiírja az összes felhasználói fiókot
    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div className="shadow-[#7C7979] shadow-md rounded-md  p-2 w-full md:flex gap-3 flex-wrap justify-center">
            {/* Felhasználói fiókok törlése */}
            <div className="shadow-[#7C7979]/30 shadow-sm  w-full sm:w-90 h-max overflow-y-scroll p-2 rounded-md text-center font-bold text-lg mx-auto">
                <h1>Felhasználók törlése</h1>

                <div className='h-85 rounded-md p-3 overflow-y-scroll overflow-hidden'>
                {users && users.map((user, index) => (
                    <li key={user.id} className="flex mb-2 justify-between items-center bg-white p-3 rounded-lg shadow-md">
                        <div>
                            <p className="font-medium">{user.displayName || "Név nélkül"}</p>
                            {/* Ide majd jön egy profilkép is */}
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <p className="text-sm text-gray-500">Tel.:{user.phoneNumber}</p>
                        </div>
                        <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700">
                            <FaTrash />
                        </button>
                    </li>
                ))}
                </div>
                
            </div>

            {/* Márkák hozzáadása / törlése */}
            <div className="shadow-[#7C7979]/30 shadow-sm h-max w-full sm:w-130 p-2 rounded-md text-center font-bold text-lg mx-auto">
                <form onSubmit={handleAddBrand}>
                    <div className='flex flex-col'>
                    <input
                    className='w-full border rounded-md p-2 mb-2'
                        type="text"
                        placeholder="Márka neve"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        required
                    />
                    <input
                    className='w-full border rounded-md p-2'
                        type="text"
                        placeholder="Kép URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                    </div>
                    <button className='border p-2 mt-2 rounded-md w-max mx-auto' type="submit">Feltöltés</button>
                </form>


                <h1>Jelenlegi márkák és képeik</h1>

                <div className='h-50 rounded-md p-3 overflow-y-scroll overflow-hidden'>
                {brands && brands.map((brand, index) => (
                    <div key={brand.id} className='flex  flex-col mb-2 justify-between items-center bg-white p-3 rounded-lg shadow-md'>
                        Neve: {brand.name}
                        <img className='border size-20 rounded-full object-cover mx-auto' src={brand.photoUrl} alt="Foto" />

                        <button onClick={() => handleDeleteBrand(brand.id)} className="text-red-500 mt-3 hover:text-red-700">
                            <FaTrash />
                        </button>
                    </div>

                ))}
                </div>
                
            </div>

            {/* Hirdetések törlése */}
            <div className=" shadow-[#7C7979]/30 shadow-sm w-full p-2 rounded-md mx-auto md:w-7/12 md:mt-0 mt-3">
                <h1 className="font-bold">Hirdetések törlése(összes hirdetés)</h1>
                {ads.map((ad) => (
                    <motion.div
                        key={ad.id}
                        className='w-full mb-2 flex-row gap-2 flex p-2 bg-white shadow-[#7C7979] shadow-md text-left rounded-md relative'
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.5,
                            ease: [0, 0.71, 0.2, 1.01],
                        }}
                    >
                        <div className='flex flex-col sm:flex-row gap-2'>
                            <div>
                                <img
                                    src={ad.photoUrl[0] || 'https://via.placeholder.com/130x110'}
                                    alt={ad.adName || 'Fotó'}
                                    className='object-cover w-[130px] h-[110px] rounded-lg bg-BaseGreen'
                                />
                                <p className='text-[#939393]'>{ad.adName}</p>
                                <p className='text-[#939393] text-sm'>Ár: {ad.price || 'N/A'}</p>
                            </div>

                            <div className='flex-1'>
                                <h1 className="font-bold">Hirdetés neve: {ad.adName}</h1>
                                <p>Leírás: {ad.description}</p>
                            </div>
                        </div>

                        {/*Törlés gomb kuka */}
                        <button
                            onClick={() => deleteAd(ad.id)}
                            className='absolute top-2 right-2 text-red-500 hover:text-red-700'
                            title='Hirdetés törlése'
                        >
                            <FaTrash />
                        </button>
                    </motion.div>
                ))}


            </div>

        </div>
    )
}