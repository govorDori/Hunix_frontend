import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const Auth = () => {

    //Navigálás
    const navigate = useNavigate()

    //Megnézzük hogy regisztrálni vagy bejelentkezni akar a felhasználó!
    const location = useLocation()
    //console.log(location.pathname);
    const isSignIn = location.pathname == '/auth/in'//true vagy false

    return (
        <div className=' min-h-screen flex items-center justify-center p-4'>
            <div className="bg-white shadow-[#7C7979] shadow-md rounded-lg text-black w-full max-w-[300px] p-3 -mt-[300px]">
                <div className='flex flex-col space-y-1'>
                    <h1 className='text-2xl tracking-wide font-bold text-center'>
                        {isSignIn ? "Bejelentkezés" : "Regisztrálás"}
                    </h1>

                    {!isSignIn && (
                        <>
                            <h2 className='text-xl'>Neved:</h2>
                            <input
                                type="text"
                                className='border-b border-BaseGreen outline-0 text-xl p-1 bg-gray-100 rounded-md'
                                name="displayName"
                            />

                            <h2 className='text-xl'>Telefonszámod:</h2>
                            <input
                                type="text"
                                className='border-b border-BaseGreen outline-0 text-xl p-1 bg-gray-100 rounded-md'
                                name="phoneNumber"
                            />

<h2 className='text-xl'>Cím:</h2>
                            <input
                                type="text"
                                className='border-b border-BaseGreen outline-0 text-xl p-1 bg-gray-100 rounded-md'
                                name="address"
                            />
                        </>
                    )}

                    <h2 className='text-xl'>Email:</h2>
                    <input
                        type="email"
                        className='border-b border-BaseGreen outline-0 text-xl p-1 bg-gray-100 rounded-md'
                        name="email"
                    />

                    <h2 className='text-xl'>Jelszó:</h2>
                    <input
                        type="password"
                        className='border-b border-BaseGreen outline-0 text-xl p-1 bg-gray-100 rounded-md'
                        name="password"
                    />

                    <button type='submit' className='cursor-pointer active:scale-95 transition-all p-2 bg-BaseGreen rounded-md mt-4 mx-auto text-center w-full max-w-[200px]'>
                        {isSignIn ? 'Bejelentkezés' : 'Regisztráció'}
                    </button>
                </div>
            </div>
        </div>


    )
}

