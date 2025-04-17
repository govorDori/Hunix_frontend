import React, { useContext, useEffect, useState } from "react"
import { getAds } from "../utility/crudUtility";
import { motion } from "framer-motion";
import { Detail } from "../components/Detail";
import { BrandContext } from "../utility/BrandContext";

export const AllAds = () => {
    const [ads, setAds] = useState([]); // Hirdetéseket tároló állapot
    const [selectedAd, setSelectedAd] = useState(null); // Kiválasztott hirdetés
    const { brands } = useContext(BrandContext); //Márkák lekérése
    

    // Hirdetések betöltése
    useEffect(() => {
        const fetchAds = async () => {
            const adsData = await getAds(); // Adatok betöltése
            setAds(adsData); // Seteljük a hirdetéseket
        };
        fetchAds();
    }, []);


    const handleAdClick = (ad) => {
        setSelectedAd(ad); // Kiválasztott hirdetés beállítása
    };

    const handleCloseDetail = () => {
        setSelectedAd(null); // Bezárás
    };

    return (
        <div className="shadow-[#7C7979] shadow-md rounded-md  p-2 w-full md:flex gap-3 flex-wrap justify-center">
            <div className="shadow-[#7C7979] shadow-sm  w-full sm:w-90 p-2 rounded-md text-center font-bold text-lg mx-auto">
                <h1>Márka alapú szűrés</h1>

            

                {brands && brands.map((brand,index) => (
                    <div className="flex items-center gap-1" key={index}>
                            <input className=" size-5" type="checkbox" name="" id="" />
                            <h2>{brand.name}</h2>
                    </div>
                ))}


            </div>
            <div className=" shadow-[#7C7979] shadow-sm w-full p-2 rounded-md mx-auto md:w-7/12 md:mt-0 mt-3">
            <h1 className="font-bold">Az összes hirdetés</h1>
            {ads.map((ad) => (
                        <motion.div 
                            key={ad.id} 
                            className='w-full mb-2 flex-row gap-2 flex p-2 bg-white shadow-[#7C7979] shadow-md text-left rounded-md'
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.5,
                                ease: [0, 0.71, 0.2, 1.01],
                            }}
                            onClick={() => handleAdClick(ad)} // Hirdetésre kattintás
                        >
                            <div>
                                <img
                                    src={ad.photoURL || 'https://via.placeholder.com/130x110'} // Kép URL vagy placeholder
                                    alt={ad.displayName || 'Fotó'}
                                    className='object-cover w-[130px] h-[110px] rounded-lg bg-BaseGreen'
                                />
                                <p className='text-[#939393]'>{ad.adName}</p>
                                <p className='text-[#939393] text-sm'>Ár: {ad.price || 'N/A'}</p>
                            </div>
                            <div>
                                <h1 className="font-bold">{ad.adName}</h1>
                                <p>Leírás: {ad.description}</p>
                                <p>Márka: {ad.brand}</p>
                                <p>Lóerő: {ad.horsePower}</p>
                            </div>
                            
                        </motion.div>
                        
                    ))}

            </div>
             {selectedAd && <Detail ad={selectedAd} onClose={handleCloseDetail} />}
        </div>
    )
}