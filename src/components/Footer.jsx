import React from 'react'
import { motion } from 'framer-motion'

export const Footer = () => {
    return (
        <motion.div
        initial={{ opacity: 0, scale: 0.5  }}
    whileInView={{ opacity: 1 , scale:1}}
    
    transition={{
      duration: 0.8,
      delay: 0.1,
      ease: [0, 0.71, 0.2, 1.01],
  }}
        
        className='text-center w-full shadow-[#7C7979]/20 shadow-md h-full p-4 rounded-lg bg-white space-y-3 max-w-[100%] mx-auto'>
            <h1 className='text-2xl'>Elérhetőségek</h1>

            {/* Teszt képpen duplikált kártyák */}
            <div className='flex gap-2 justify-around flex-wrap'>


                <div className=' sm:w-max w-full flex flex-col justify-center items-center pr-5 pl-5 p-2 shadow-[#e0e0e0] shadow-md rounded-lg bg-white'>
                    <h1 className='font-bold text-xl tracking-wide'>Govorkovics Dóra</h1>
                    <div className='text-center'>
                        <p className='break-words  w-[250px]'>Kedvelem a webfejlesztést és világát. Számomra a legkedvesebb rész a design megtervezése és megvalósítása.</p>
                        <p className='text-[#939393]'>Email: dorigovor2006@gmail.com</p>
                        <p className='text-[#939393]'>Tel.: +36 70 514 8645</p>
                        <p className='text-[#939393]'>Munkakör: Programozó</p>
                    </div>
                </div>

                <div className='sm:w-max w-full flex flex-col justify-center items-center pr-5 pl-5 p-2 shadow-[#e0e0e0] shadow-md rounded-lg bg-white'>
                    <h1 className='font-bold text-xl tracking-wide'>Várbogyai Ádám</h1>
                    <div className='text-center'>
                        <p className='break-words  w-[250px]'>Kezdő programozó vagyok, főként weboldalak front és backend részéhez értek.</p>
                        <p className='text-[#939393]'>Email: v.adam3000@gmail.com</p>
                        <p className='text-[#939393]'>Tel.: +36 30 287 3725</p>
                        <p className='text-[#939393]'>Munkakör: Programozó</p>
                    </div>
                </div>

                <div className='sm:w-max w-full flex flex-col justify-center items-center pr-5 pl-5 p-2 shadow-[#e0e0e0] shadow-md rounded-lg bg-white'>
                    <h1 className='font-bold text-xl tracking-wide'>Molnár Nándor</h1>
                    <div className='text-center'>
                        <p className='break-words  w-[250px]'>Front -és backend programozó vagyok, már több ügyfél weboldaláért vagyok felelős.</p>
                        <p className='text-[#939393]'>Email: ggamerek123@gmail.com</p>
                        <p className='text-[#939393]'>Tel.: +36 30 432 5533</p>
                        <p className='text-[#939393]'>Munkakör: Programozó</p>
                    </div>
                </div>


            </div>




        </motion.div>
    )
}

