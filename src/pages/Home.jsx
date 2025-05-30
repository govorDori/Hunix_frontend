import React, { useContext } from 'react'
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { Categs } from '../components/Categs';
import { Allitem } from '../components/Allitem';
import { Footer } from '../components/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandContext } from '../utility/BrandContext';

export const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { brands } = useContext(BrandContext); //Márkák lekérése
    const [searchTerm, setSearchTerm] = useState(""); //kereséshez szükséges State
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);

    };


    return (
        <div className='max-w-6xl mx-auto p-2'>


            {/* Kereső mező / kereséshez szükséges gombok */}
            <div className='flex p-3 items-center rounded-lg shadow-[#7c7979]/20 shadow-md pl-4 pr-4 gap-3 w-full bg-white flex-wrap'>
                <div className='flex-1 min-w-[200px] '>
                    <input
                        type="text"
                        placeholder='Keresés'
                        className='p-2 border-gray-300 border rounded-sm w-full outline-0 placeholder-shown:text-gray-600'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && navigate('/allads', { state: { searchTerm } })}
                    />
                </div>

                <div className='flex md:gap-9 gap-2 w-max mx-auto flex-wrap justify-center'>
                    <div className='flex relative flex-col'>
                        <button onClick={toggleMenu} className='p-1.5 text-md break-words rounded-sm bg-BaseGreen w-max font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center flex items-center sm:pl-5 sm:pr-5 pl-2 pr-0'>
                            Márkák {isMenuOpen ? <GoTriangleUp className='text-3xl pt-1' /> : <GoTriangleDown className='text-3xl pt-1' />}
                        </button>

                        <div className={`${isMenuOpen ? 'block' : 'hidden'} absolute w-full text-center p-2 mx-auto mt-12 border border-gray-500 z-50 shadow-md shadow-black  bg-BaseGreen rounded-md flex flex-col gap-y-2`}>
                            {brands && brands.map((brand, index) => (
                                <div key={brand.name} className='cursor-pointer'
                                    onClick={() => navigate('/allads', { state: { selectedBrand: brand.name } })}>
                                    {brand.name}
                                </div>
                            ))}

                        </div>


                    </div>


                    <button
                        onClick={() => navigate('/allads', { state: { searchTerm } })}
                        className='p-1.5 rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center'>
                        Keresés
                    </button>
                </div>
            </div>



            {/* Kategória / hirdetés tároló */}
            <div className='mt-3  flex justify-center flex-wrap md:flex  lg:items-center lg:justify-center rounded-lg  gap-2 '>
                {/* Bal oszlop*/}
                <div className='md:flex lg:flex-col lg:items-stretch items-center justify-center w-full gap-2  lg:w-[50%] min-w-[10%]'>
                    <div className='shadow-[#7C7979]/20 md:h-full md:w-full min-w-[10%]  mx-auto shadow-md p-4 rounded-lg bg-white space-y-2'>
                        <h1 className='tracking-wide text-xl'>Böngéssz hirdetéseink közt!</h1>
                        <p className='text-[#939393] mt-[-10px]'>Találd meg a számodra járművet.</p>
                        <button
                            onClick={() => navigate('./allads')}
                            className='mt-2 p-1.5 rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95 h-[45px] transition-all cursor-pointer text-center'>
                            Megtekintés
                        </button>
                    </div>

                    {/* Kategóriák */}
                    <div className='lg:mt-3  md:max-w-[100%]  lg:w-full lg:p-0 md:w-[140%] mt-2 md:mt-0'>
                        <Categs />
                    </div>
                </div>

                {/* Jobb oszlop (kép) */}
                <div className='lg:flex shadow-[#7C7979]/20 shadow-md flex-col w-full hidden md:w-[49%] min-w-[10%]'>
                    <img
                        src="https://res.cloudinary.com/adamblog/image/upload/v1748351625/toppng.com-car-parts-for-volvo-volvo-940-781x392_hlwb5b.png"
                        alt=""
                        className='w-full h-[375px] object-contain rounded-lg'
                    />
                </div>
            </div>

            {/* Összes hirdetés komponens */}
            <div className='mt-3 flex'>
                <Allitem />
            </div>


            {/* Footer */}
            <div className='mt-3 flex'>
                <Footer />
            </div>


        </div>
    );
};

