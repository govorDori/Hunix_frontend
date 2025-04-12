import React from 'react'
import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {UserContext} from '../utility/UserContext'
import { Toastify } from '../components/Toastify';

export const Auth = () => {
    //Regisztrálás/bejelentkezés
    const { user, signInUser, signUpUser, msg } = useContext(UserContext)
    
    
    //handleSubmit letisztultabb regisztracio
    const handleSubmit = async (event) => {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const email = data.get('email');
  const password = data.get('password');
  const displayName = data.get('displayName');
  const phoneNumber = data.get('phoneNumber');
  const address = data.get('address');

 

  if (isSignIn) {
    signInUser(email, password);
  } else {
    // Regisztráció plusz adatokkal
    signUpUser(email, password, displayName, phoneNumber, address);
  }
};


    //Navigálás
    const navigate = useNavigate()

    //Megnézzük hogy regisztrálni vagy bejelentkezni akar a felhasználó!
    const location = useLocation()
    //console.log(location.pathname);
    const isSignIn = location.pathname == '/auth/in'//true vagy false

    return (
        <form onSubmit={handleSubmit}>
  <div className='min-h-screen flex items-center justify-center p-4'>
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
              required
            />

            <h2 className='text-xl'>Telefonszámod:</h2>
            <input
              type="text"
              className='border-b border-BaseGreen outline-0 text-xl p-1 bg-gray-100 rounded-md'
              name="phoneNumber"
              required
            />

            <h2 className='text-xl'>Cím:</h2>
            <input
              type="text"
              className='border-b border-BaseGreen outline-0 text-xl p-1 bg-gray-100 rounded-md'
              name="address"
              required
            />
          </>
        )}

        <h2 className='text-xl'>Email:</h2>
        <input
          type="email"
          className='border-b border-BaseGreen outline-0 text-xl p-1 bg-gray-100 rounded-md'
          name="email"
          required
        />

        <h2 className='text-xl'>Jelszó:</h2>
        <input
          type="password"
          className='border-b border-BaseGreen outline-0 text-xl p-1 bg-gray-100 rounded-md'
          name="password"
          required
        />

        <button type='submit' className='cursor-pointer active:scale-95 transition-all p-2 bg-BaseGreen rounded-md mt-4 mx-auto text-center w-full max-w-[200px]'>
          {isSignIn ? 'Bejelentkezés' : 'Regisztráció'}
        </button>
        {isSignIn ? 
        <button type='button' onClick={()=>navigate('/pwreset')} className='cursor-pointer active:scale-95 transition-all p-2 bg-BaseGreen rounded-md mt-4 mx-auto text-center w-full max-w-[200px]'>
          Elfelejtett jelszó
        </button> : <></>}
      </div>
    </div>
  </div>
  {msg && <Toastify  {...msg} />}
</form>



    )
}

