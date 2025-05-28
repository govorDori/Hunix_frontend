import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { db, UserContext } from '../utility/UserContext';
import { useEffect } from 'react';
import { extractUrlAndId } from '../utility/utils';
import { doc, getDoc } from 'firebase/firestore';

export const Header = () => {
    const navigate = useNavigate();
    //user lekérdezése, be van e jelentkezve vagy nem?
    const {user,logoutUser}=useContext(UserContext)
    const [avatar, setAvatar] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
        !user && setAvatar(null)
    },[user,user?.photoURL]);
    

    //Admin e vagy sem
    useEffect(() => {
        const checkRole = async () => {
          if (!user) return;
    
          const docRef = doc(db, 'Users', user.uid);
          const docSnap = await getDoc(docRef);
    
          if (docSnap.exists()) {
            const data = docSnap.data();
            setIsAdmin(data.role === 'admin');
          }
        };
    
        checkRole();
      }, [user]);
    // console.log("Admin vagy-e: "+isAdmin); //teszt miatt
    
    return (
        <div>
            <div className='flex gap-7 items-center max-w-6xl mx-auto  justify-between p-2 flex-wrap'>
                <div className='text-4xl' onClick={() => navigate('/')}>
                    <img src="/HunixLogoMain.png" className='object-contain w-43 cursor-pointer'/>
                </div>

                {/* MID-méretig normál képernyőn*/}
                <div className='gap-3 p-1 items-center flex-wrap justify-center md:flex hidden transition-all ease-in-out'>
                    <div className='gap-5 flex bg-white h-max p-0.5 pl-4 pr-4 items-center justify-center rounded-lg shadow-[#7C7979]/20 shadow-md'>
                        { !user ? (
                            <>
                        <button className='text-[#9E9E9E] h-max p-1 cursor-pointer' onClick={() => navigate('/auth/in')}>Bejelentkezés</button>
                        <button className='text-[#9E9E9E] h-max p-1 cursor-pointer' onClick={() => navigate('/auth/up')}>Regisztrálás</button>
                        </>
                        )
                    :
                    (
                        <>
                        <button className=' h-max p-1 cursor-pointer text-[#9E9E9E]' onClick={() => navigate('/profile')}>Profil</button>
                        <button className=' h-max p-1 cursor-pointer text-[#9E9E9E]' onClick={() => navigate('/garage')}>Garázs</button>
                        <button className=' h-max p-1 cursor-pointer text-[#9E9E9E]' onClick={() => navigate('/postcreate')}>Új hirdetés</button>
                        <button className=' h-max p-1 cursor-pointer text-[#9E9E9E]' onClick={() => logoutUser()}>Kijelentkezés</button>
                        {isAdmin && (
                            <button className=' h-max p-1 cursor-pointer text-[#9E9E9E]' onClick={() => navigate('/admin')}>Admin Panel</button>
                        )}
                        </>
                    )}
                        
                        
                    </div>
                    <div>
                        <img
                            src={user && avatar ? avatar : "NoUser.jpg"}
                            alt=""
                            width={"50px"}
                            className='rounded-full object-cover border border-gray-300 bg-white w-[50px] h-[50px] shadow-[#7C7979]/20 shadow-md'
                        />
                    </div>
                </div>

                {/* Hamburger ikon switch*/}
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='text-2xl  mt-1'>
                        {isMenuOpen ? <FaTimes /> : <FaBars />} {/* Ikon váltás */}
                    </button>
                </div>

            </div>

            {/* Reszponzív menü */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'}  md:hidden fixed right-0 z-1 mt-1 mr-1 bg-white w-max rounded-lg transition-all duration-300 ease-in-out shadow-[#7C7979]/20 shadow-md`}>

                <div className='flex flex-col items-center gap-3 p-4'>
                { !user ? (
                            <>
                        <button className='text-[#9E9E9E] h-max p-1 cursor-pointer' onClick={() => navigate('/auth/in')}>Bejelentkezés</button>
                        <button className='text-[#9E9E9E] h-max p-1 cursor-pointer' onClick={() => navigate('/auth/up')}>Regisztrálás</button>
                        </>
                        )
                    :
                    (
                        <>
                        <button className=' h-max p-1 cursor-pointer text-[#9E9E9E]' onClick={() => navigate('/profile')}>Profil</button>
                        <button className=' h-max p-1 cursor-pointer text-[#9E9E9E]' onClick={() => navigate('/garage')}>Garázs</button>
                        <button className=' h-max p-1 cursor-pointer text-[#9E9E9E]' onClick={() => navigate('/postcreate')}>Új hirdetés</button>
                        <button className=' h-max p-1 cursor-pointer text-[#9E9E9E]' onClick={() => logoutUser()}>Kijelentkezés</button>
                        {isAdmin && (
                            <button className=' h-max p-1 cursor-pointer text-[#9E9E9E]' onClick={() => navigate('/admin')}>Admin Panel</button>
                        )}
                        </>
                    )}
                    <div>
                        <img
                            src={user && avatar ? avatar : "NoUser.jpg"}
                            alt=""
                            width={"50px"}
                            className='rounded-full object-cover border border-gray-300 bg-white w-[50px] h-[50px] shadow-[#7C7979]/20 shadow-md'
                        />
                    </div>
                </div>
            </div>

            <Outlet />
        </div>
    );
};