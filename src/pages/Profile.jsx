import React from 'react'
import { useState } from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'

export const Profile = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);

    };



    return (
        <div className='md:flex lg:flex-row lg:items-stretch justify-center w-[100%] p-2 m-auto  gap-2  lg:w-[100%]'>

            <div className='shadow-[#7C7979] md:h-full items-center md:w-5/12 min-w-[10%] max-w-[100%] flex flex-col   mx-auto shadow-md p-4 rounded-lg bg-white space-y-2 mb-2'>
                <h1 className='tracking-wide text-xl'>Profil</h1>
                <div>
                    <img
                        src="null"
                        alt=""
                        width={"50px"}
                        className='rounded-full object-cover bg-white w-[50px] h-[50px] shadow shadow-gray-400/50'
                    />
                </div>
                <p className='text-[#939393] mt-[-10px]'>--Ember neve--</p>

                <div className='flex bg-BaseGreen items-center justify-center text-center rounded-md'>
                    <input className='text-black  rounded-md flex mx-auto w-[80%] font-semibold' type="file" />
                </div>
                <button className='mt-2  h-max p-2.5 break-words rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95  transition-all cursor-pointer text-center'>
                    Profilkép módosítása
                </button>


                {/* További beállítások menü */}
                <button onClick={toggleMenu} className='p-1.5 text-md break-words rounded-sm bg-BaseGreen w-max font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center flex items-center sm:pl-5 sm:pr-5 pl-2 pr-0'>
                    További beállítások {isMenuOpen ? <GoTriangleUp className='text-3xl pt-1' /> : <GoTriangleDown className='text-3xl pt-1' />}
                </button>


                <div className={`${isMenuOpen ? 'block' : 'hidden'}  w-max flex flex-col gap-y-2`}>
                    {/* Név módosítás */}
                    <div className='border rounded-md border-gray-200 flex flex-col gap-y-2 p-2'>
                        <h1 className='text-lg'>Mév módosítása</h1>
                        <input
                            type="text"
                            className='border-b border-BaseGreen outline-0 text-lg p-1 bg-gray-100 rounded-md'
                            name="username"

                        />



                        <button className='mt-2  h-max p-2.5 rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center'>
                            Módosítás
                        </button>
                    </div>

                    {/* Telefonszám modositás */}
                    <div className='border rounded-md border-gray-200 flex flex-col gap-y-2 p-2'>
                        <h1 className='text-lg'>Telefonszám módosítása</h1>
                        <input
                            type="text"
                            className='border-b border-BaseGreen outline-0 text-lg p-1 bg-gray-100 rounded-md'
                            name="phonenumber"

                        />



                        <button className='mt-2  h-max p-2.5 rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center'>
                            Módosítás
                        </button>
                    </div>

                    {/* Jelszó módosítás */}
                    <div className='border rounded-md border-gray-200 flex flex-col gap-y-2 p-2'>

                        <h1 className='text-lg'>Új jelszó beállítása</h1>
                        <input
                            type="password"
                            className='border-b border-BaseGreen outline-0 text-lg p-1 bg-gray-100 rounded-md'
                            name="password"
                            placeholder='Jelenlegi jelszó'
                        />

                        <input
                            type="password"
                            className='border-b border-BaseGreen outline-0 text-lg p-1 bg-gray-100 rounded-md'
                            name="password"
                            placeholder='Új jelszó'
                        />

                        <button className='mt-2  h-max p-2.5 rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center'>
                            Jelszó módosítása
                        </button>
                    </div>


                </div>

            </div>

            <div className='shadow-[#7C7979] md:h-full md:w-full min-w-[10%] max-w-[100%]   mx-auto shadow-md p-4 rounded-lg bg-white space-y-2'>
                <h1 className='tracking-wide text-xl'>Hirdetéseid</h1>
                <p className='text-[#939393] mt-[-10px]'>Az összes hirdetésed</p>

                <div className='gap-1 sm:grid grid-cols-2'>

                    <div className='border rounded-md border-gray-300 w-full p-2 mb-1'>
                        <h1 className='text-2xl font-bold'>Hirdetés neve: <span className='text-green-400'>Teszt</span></h1>
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, deleniti repellat. Distinctio mollitia alias quod nemo asperiores provident ratione voluptates earum, cumque in libero dolorem animi vitae? Explicabo, alias iure?</h2>
                        <div className='gap-x-3 flex flex-wrap'>
                        <button className='mt-2  h-max p-2.5 rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center'>
                            Megtekintés
                        </button>
                        <button disabled className='mt-2  h-max p-2.5 rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center'>
                            Módosítás
                        </button>
                        </div>
                    </div>

                    <div className='border rounded-md border-gray-300 w-full p-2 mb-1'>
                        <h1 className='text-2xl font-bold'>Hirdetés neve: <span className='text-green-400'>Teszt</span></h1>
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, deleniti repellat. Distinctio mollitia alias quod nemo asperiores provident ratione voluptates earum, cumque in libero dolorem animi vitae? Explicabo, alias iure?</h2>
                        <div className='gap-x-3 flex flex-wrap'>
                        <button className='mt-2  h-max p-2.5 rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center'>
                            Megtekintés
                        </button>
                        <button disabled className='mt-2  h-max p-2.5 rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center'>
                            Módosítás
                        </button>
                        </div>
                    </div>

                    <div className='border rounded-md border-gray-300 w-full p-2 mb-1'>
                        <h1 className='text-2xl font-bold'>Hirdetés neve: <span className='text-green-400'>Teszt</span></h1>
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, deleniti repellat. Distinctio mollitia alias quod nemo asperiores provident ratione voluptates earum, cumque in libero dolorem animi vitae? Explicabo, alias iure?</h2>
                        <div className='gap-x-3 flex flex-wrap'>
                        <button className='mt-2  h-max p-2.5 rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center'>
                            Megtekintés
                        </button>
                        <button disabled className='mt-2  h-max p-2.5 rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center'>
                            Módosítás
                        </button>
                        </div>
                    </div>

                </div>

            </div>



        </div>
    )
}


