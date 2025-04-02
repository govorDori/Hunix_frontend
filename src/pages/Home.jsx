import React from 'react'
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { Categs } from '../components/Categs';
import { Allitem } from '../components/Allitem';
import { Footer } from '../components/Footer';
import { useState } from 'react';

export const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);

    };


    return (
        <div className='max-w-6xl mx-auto p-2'>


            {/* Kereső mező / kereséshez szükséges gombok */}
            <div className='flex p-3 items-center rounded-lg shadow-[#7C7979] shadow-md pl-4 pr-4 gap-3 w-full bg-white flex-wrap'>
                <div className='flex-1 min-w-[200px] '>
                    <input
                        type="text"
                        placeholder='Keresés'
                        className='p-2 border-gray-300 border rounded-sm w-full outline-0 placeholder-shown:text-gray-600'
                    />
                </div>

                <div className='flex md:gap-9 gap-2 w-max mx-auto flex-wrap justify-center'>
                    <div className='flex relative flex-col'>
                        <button onClick={toggleMenu} className='p-1.5 text-md break-words rounded-sm bg-BaseGreen w-max font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center flex items-center sm:pl-5 sm:pr-5 pl-2 pr-0'>
                            Kategóriák {isMenuOpen ? <GoTriangleUp className='text-3xl pt-1' /> : <GoTriangleDown className='text-3xl pt-1' />}
                        </button>

                        <div className={`${isMenuOpen ? 'block' : 'hidden'} absolute w-full text-center p-2 mx-auto mt-12 border border-gray-500 shadow-md shadow-black  bg-BaseGreen rounded-md flex flex-col gap-y-2`}>
                                <button>Kateg1</button>
                                <button>Kateg2</button>
                                <button>Kateg3</button>
                            </div>


                    </div>


                    <button className='p-1.5 rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center'>
                        Keresés
                    </button>
                </div>
            </div>



            {/* Kategória / hirdetés tároló */}
            <div className='mt-3  flex justify-center flex-wrap md:flex  lg:items-center lg:justify-center rounded-lg  gap-2 '>
                {/* Bal oszlop*/}
                <div className='md:flex lg:flex-col  lg:items-stretch items-center justify-center w-full   gap-2  lg:w-[50%] min-w-[10%]'>
                    <div className='shadow-[#7C7979] md:h-full md:w-full min-w-[10%] max-w-[100%]  mx-auto shadow-md p-4 rounded-lg bg-white space-y-2'>
                        <h1 className='tracking-wide text-xl'>Böngéssz alkatrészeink közt!</h1>
                        <p className='text-[#939393] mt-[-10px]'>Találd meg a számodra tökéletes alkatrészt.</p>
                        <button className='mt-2 p-1.5 rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95 h-[45px] transition-all cursor-pointer text-center'>
                            Megtekintés
                        </button>
                    </div>

                    {/* Kategóriák */}
                    <div className='lg:mt-3  md:max-w-[100%]  lg:w-full lg:p-0 md:w-[50%] mt-2 md:mt-0'>
                        <Categs />
                    </div>
                </div>

                {/* Jobb oszlop (kép) */}
                <div className='lg:flex flex-col w-full hidden md:w-[49%] min-w-[10%]'>
                    <img
                        src="./HunixTestCar.jpg"
                        alt=""
                        className='w-full h-[375px] object-cover rounded-lg'
                    />
                </div>
            </div>

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

