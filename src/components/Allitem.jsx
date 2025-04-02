import { motion } from 'framer-motion';
import React from 'react'
import { useRef } from 'react';
import { GoTriangleLeft } from "react-icons/go";
import { GoTriangleRight } from "react-icons/go";

export const Allitem = () => {
    const scrollContainerRef = useRef(null);
    const scrollContainerRef2 = useRef(null);

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

    const scrollLeft2 = () => {
        if (scrollContainerRef2.current) {
            scrollContainerRef2.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight2 = () => {
        if (scrollContainerRef2.current) {
            scrollContainerRef2.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    return (
        <div className='mt-0 shadow-[#7C7979] shadow-md h-full p-4 rounded-lg bg-white space-y-3 max-w-[100%] mx-auto'>
            <h1 className='tracking-wide text-xl'>Hírdetések</h1>
            <p className='text-[#939393] mt-[-10px]'>Eladók által meghirdetett termékek.</p>

            {/* Autók szekció, végig kell majd mappolni az autók kategórián azon belül ár meg terméknév és képen is. */}
            <h1 className='text-[#939393] text-2xl mb-1'>Autók</h1>
            {/* Görgetés */}
            <div className='relative '>

                {/* Balra görgetés gombja */}
                <button
                    onClick={scrollLeft}
                    className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md shadow-black z-10'
                >
                    <GoTriangleLeft />
                </button>

                {/* Kategóriák konténere */}
                <div
                    ref={scrollContainerRef}
                    className='flex overflow-x-auto gap-4 p-2 scrollbar-hide'

                >
                    {/* Egy map ami teszteli sok kategória esetén mi történik(később hasznos lesz) */}
                    {[...Array(10)].map((e, index) => (
                        <motion.div key={index}
                        className='flex-shrink-0 justify-center flex-col flex p-2 bg-white shadow-[#7C7979] shadow-md text-left rounded-md'
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.5 + index/10,
                            ease: [0, 0.71, 0.2, 1.01],
                        }}

                        >
                            <div>
                            <img
                                src="null"
                                alt=""
                                className='object-cover w-[130px] h-[110px] rounded-lg bg-BaseGreen'
                            />
                            <p className='text-[#939393]'>TermékNeve{index}</p>
                            <p className='text-[#939393] text-sm'>Ár:100.000</p>
                        </div>
                        </motion.div>
                    ))}
                </div>

                {/* Jobbra görgetés gombja */}
                <button
                    onClick={scrollRight}
                    className='absolute right-0 top-1/2 transform -translate-y-1/2  bg-white p-2 rounded-full shadow-md shadow-black z-10'
                >
                    <GoTriangleRight />
                </button>
            </div>



            
            
        </div>
    );
}

