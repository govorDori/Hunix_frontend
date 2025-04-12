
import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import { GoTriangleLeft } from "react-icons/go";
import { GoTriangleRight } from "react-icons/go";

export const Categs = () => {
    const scrollContainerRef = useRef(null);

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


    return (
        <div className='mt-0 shadow-[#7C7979] shadow-md h-full p-4 rounded-lg bg-white space-y-3 max-w-[100%] mx-auto'>
            <h1 className='tracking-wide text-xl'>Felkapott márkák!</h1>

            {/* Görgetés */}
            <div className='relative'>

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
                // scrollbar-hide: elrejti a görgetősávot
                >
                    {/* Egy map ami teszteli sok kategória esetén mi történik(később hasznos lesz) ide jöhetnek kocsi márkák és képei akár*/}
                    {[...Array(10)].map((e, index) => (
                        <motion.dev key={index}
                        className='flex-shrink-0 text-center justify-center items-center flex-col flex'
                        initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                        animate={{ opacity: 1, scale: 1 , rotate: 0}}
                        transition={{
                            duration: 0.8,
                            delay: 0.5 + index/10,
                            ease: [0, 0.71, 0.2, 1.01],
                           
                        }}
                        >
                        <div>
                            <img
                                src="./HunixTestCar.jpg"
                                alt=""
                                className='object-cover w-[100px] h-[100px] rounded-full'
                            />
                            <p className='text-[#939393]'>Márka{index}</p>
                        </div>
                        </motion.dev>
                       
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

