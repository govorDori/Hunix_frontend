import React, { useContext, useEffect, useState } from "react"
import { getAds } from "../utility/crudUtility";
import { motion } from "framer-motion";
import { Detail } from "../components/Detail";
import { BrandContext } from "../utility/BrandContext";
import { useLocation, useNavigate } from "react-router-dom";

export const AllAds = () => {
    const [ads, setAds] = useState([]); // Hirdetéseket tároló állapot
    const [selectedAd, setSelectedAd] = useState(null); // Kiválasztott hirdetés
    const { brands } = useContext(BrandContext); //Márkák lekérése

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [adsPerPage] = useState(5);

    const [selectedBrands, setSelectedBrands] = useState([]); //Több márka szűrése esetén tömbbe tároljuk

    const location = useLocation(); //React routerrel kiszedjük a helyet
    const searchTerm = location.state?.searchTerm || ""; //a lokáció statjét kérjük ki amit searchTerm-ként kapott
    const navigate = useNavigate();

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

    //Kiszedi az URL ben kapott kiválasztott márkát és bepipálja kezdetben
    useEffect(() => {
        const brandFromURL = location.state?.selectedBrand || "";
        if (brandFromURL && !selectedBrands.includes(brandFromURL)) {
            setSelectedBrands([brandFromURL]); // Kezdetben csak az URL-ből jövő márka legyen kiválasztva
        }
    }, [location.state]);

    const filteredAds = ads.filter(ad =>
        (selectedBrands.length === 0 || selectedBrands.includes(ad.brand)) &&
        (searchTerm === "" || ad.adName.toLowerCase().includes(searchTerm.toLowerCase()) || ad.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    //Lapozás matek
    const indexOfLastAd = currentPage * adsPerPage;
    const indexOfFirstAd = indexOfLastAd - adsPerPage;
    const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);
    const totalPages = Math.ceil(filteredAds.length / adsPerPage);

    // URL paraméter kezelése
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const page = parseInt(searchParams.get('page')) || 1;
        setCurrentPage(page);
    }, [location.search]);

    // Oldalváltásnál URL frissítése
    const handlePageChange = (page) => {
        setCurrentPage(page);
        navigate(`?page=${page}`, { replace: true });
    };

    return (
        <div className="shadow-[#7C7979]/30 shadow-md rounded-md  p-2 w-full md:flex gap-3 flex-wrap justify-center">

            <div className="shadow-[#7C7979]/20 shadow-sm md:w-68 max-w-100 p-2 rounded-md text-center text-lg mx-auto">
                <h1 className="font-bold text-green-700 italic text-xl break-words">Márka alapú szűrés</h1>

                <p className="italic text-md">Keresett szó: {searchTerm}</p>
                <p className="italic text-md">Keresett márka: {selectedBrands.join(", ")}</p>

                {brands && brands.map((brand, index) => (
                    <div className="flex items-center gap-1" key={index}>
                        <input className=" size-5 bg-green-400"
                            checked={selectedBrands.includes(brand.name)} // Ki van e pipálva teszt
                            onChange={() => {
                                // Ha benne van, töröljük, ha nincs, hozzáadjuk
                                setSelectedBrands(prev =>
                                    prev.includes(brand.name)
                                        ? prev.filter(b => b !== brand.name) // Del
                                        : [...prev, brand.name]              // Inp
                                );
                            }}
                            type="checkbox" />
                        <h2 className="font-semibold">{brand.name}</h2>
                    </div>
                ))}
                <button
                    onClick={() => {
                        setSelectedBrands([]);
                        // Ha van searchTerm(keresett szó) akkor ujratölti az oldalt, ujranavigál
                        if (searchTerm) {
                            navigate(location.pathname, { replace: true });
                        }
                    }}
                    className="p-2 bg-red-300 rounded text-sm"
                >
                    Szűrés törlése
                </button>
            </div>

            <div className=" shadow-[#7C7979]/20 shadow-sm max-w-240 p-2 rounded-md  mx-auto md:w-9/12 md:mt-0 mt-3">
                <h1 className="font-bold text-green-700 italic text-xl break-words">Az összes hirdetés</h1>
                {currentAds
                    .filter(ad =>
                        (selectedBrands.length === 0 || selectedBrands.includes(ad.brand)) && // Több márka szűrés
                        (searchTerm === "" ||
                            ad.adName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ad.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    )
                    .map((ad) => (
                        <motion.div
                            key={ad.id}
                            className='w-full mb-2 flex-row gap-2 flex p-2 cursor-pointer active:scale-95 transition bg-white shadow-[#7C7979] shadow-md text-left rounded-md'
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.1,
                                delay: 0.3,
                                ease: [0, 0.71, 0.2, 1.01],
                            }}
                            onClick={() => handleAdClick(ad)} // Hirdetésre kattintás
                        >
                            <div className=" w-full flex  gap-x-2 flex-wrap">
                                <div>
                                    <img
                                        src={ad.photoUrl[0] || 'https://via.placeholder.com/130x110'} // Kép URL vagy placeholder
                                        alt={ad.displayName || 'Fotó'}
                                        className='object-cover w-[130px] h-[110px] rounded-lg bg-BaseGreen'
                                    />
                                    <p className='text-[#939393]'>{ad.adName}</p>
                                    <p className='text-[#939393] text-sm'>Ár: {ad.price || 'N/A'}</p>
                                </div>
                                <div>
                                    <h1 className="font-bold">{ad.adName}</h1>
                                    <p ><strong>Leírás:</strong> {ad.description}</p>
                                    <p><strong>Márka:</strong> {ad.brand}</p>
                                    <p className="cursor-pointer italic text-[#939393]">Kattints a részletekért</p>
                                </div>
                            </div>

                        </motion.div>


                    ))}



                <div className="flex justify-center gap-2 mt-4">
                    <button
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Előző
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={`p-2 ${currentPage === i + 1 ? 'bg-green-400' : 'bg-gray-200'} rounded`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Következő
                    </button>
                </div>



            </div>
            {selectedAd && <Detail ad={selectedAd} onClose={handleCloseDetail} />}
        </div>
    )
}