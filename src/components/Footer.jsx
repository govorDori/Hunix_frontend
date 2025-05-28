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
                    <div className='object-cover w-[100px] h-[100px] rounded-full border border-[#939393]'>
                        <img src="null" alt="" />
                    </div>
                    <h1 className='font-bold text-xl tracking-wide'>Govorkovics Dóra</h1>
                    <div className='text-center'>
                        <p className='break-words  w-[250px]'>Szöveg magadról Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima natus labordolopernatur? Quas quaerat tenetur laudantium!</p>
                        <p className='text-[#939393]'>Email:</p>
                        <p className='text-[#939393]'>Tel.:</p>
                        <p className='text-[#939393]'>Munkakör: asdasd</p>
                    </div>
                </div>

                <div className='sm:w-max w-full flex flex-col justify-center items-center pr-5 pl-5 p-2 shadow-[#e0e0e0] shadow-md rounded-lg bg-white'>
                    <div className='object-cover w-[100px] h-[100px] rounded-full border border-[#939393]'>
                        <img src="null" alt="" />
                    </div>
                    <h1 className='font-bold text-xl tracking-wide'>Várbogyai Ádám</h1>
                    <div className='text-center'>
                        <p className='break-words  w-[250px]'>Szöveg magadról Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima natus labordolopernatur? Quas quaerat tenetur laudantium!</p>
                        <p className='text-[#939393]'>Email:</p>
                        <p className='text-[#939393]'>Tel.:</p>
                        <p className='text-[#939393]'>Munkakör: asdasd</p>
                    </div>
                </div>

                <div className='sm:w-max w-full flex flex-col justify-center items-center pr-5 pl-5 p-2 shadow-[#e0e0e0] shadow-md rounded-lg bg-white'>
                    <div className='object-cover w-[100px] h-[100px] rounded-full border border-[#939393]'>
                        <img src="null" alt="" />
                    </div>
                    <h1 className='font-bold text-xl tracking-wide'>Molnár Nándor</h1>
                    <div className='text-center'>
                        <p className='break-words  w-[250px]'>Szöveg magadról Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima natus labordolopernatur? Quas quaerat tenetur laudantium!</p>
                        <p className='text-[#939393]'>Email:</p>
                        <p className='text-[#939393]'>Tel.:</p>
                        <p className='text-[#939393]'>Munkakör: asdasd</p>
                    </div>
                </div>


            </div>




        </motion.div>
    )
}

