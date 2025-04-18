import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import { getAds } from '../utility/crudUtility'; // getAds import
import { Detail } from './Detail'; // Detail import

export const Allitem = () => {
    const [ads, setAds] = useState([]); // Hirdetéseket tároló állapot
    const [selectedAd, setSelectedAd] = useState(null); // Kiválasztott hirdetés
    const scrollContainerRef = useRef(null);

    // Hirdetések betöltése
    useEffect(() => {
        const fetchAds = async () => {
            const adsData = await getAds(); // Adatok betöltése
            setAds(adsData); // Seteljük a hirdetéseket
        };
        fetchAds();
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    const handleAdClick = (ad) => {
        setSelectedAd(ad); // Kiválasztott hirdetés beállítása
    };

    const handleCloseDetail = () => {
        setSelectedAd(null); // Bezárás
    };

    return (
        <div className='mt-0 shadow-[#7C7979]/20 shadow-md h-full p-4 rounded-lg bg-white space-y-3 max-w-[100%] mx-auto'>
            <h1 className='tracking-wide text-xl'>Hírdetések</h1>
            <p className='text-[#939393] mt-[-10px]'>Eladók által meghirdetett termékek.</p>

            <h1 className='text-[#939393] text-2xl mb-1'>Autók</h1>

            {/* Görgetés */}
            <div className='relative'>

                {/* Balra görgetés gombja */}
                <button
                    onClick={scrollLeft}
                    className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md shadow-black z-10'
                >
                    <GoTriangleLeft />
                </button>

                {/* Hirdetések konténere */}
                <div ref={scrollContainerRef} className='flex overflow-x-auto gap-4 p-2 scrollbar-hide'>
                    {/* Hirdetések megjelenítése */}
                    {ads.map((ad) => (
                        <motion.div 
                            key={ad.id} 
                            className='flex-shrink-0 justify-center flex-col flex p-2 bg-white shadow-[#7C7979]/20 shadow-md text-left rounded-md'
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
                                    src={ad.photoURL || `./HunixTestCar.jpg`} // Kép URL vagy placeholder
                                    alt=""
                                    className='object-cover w-[130px] h-[110px] rounded-lg bg-BaseGreen'
                                />
                                <p className='text-[#939393]'>{ad.adName}</p>
                                <p className='text-[#939393] text-sm'>Ár: {ad.price || 'N/A'}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Jobbra görgetés gombja */}
                <button
                    onClick={scrollRight}
                    className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md shadow-black z-10'
                >
                    <GoTriangleRight />
                </button>
            </div>

            {/* Ha kattintottunk egy hirdetésre bejön a Detail ablak a hirdetés információival.*/}
            {selectedAd && <Detail ad={selectedAd} onClose={handleCloseDetail} />}
        </div>
    );
};
