import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'
import { db, UserContext } from '../utility/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Toastify } from '../components/Toastify';
import UserAds from '../components/UserAds';
import { Detail } from '../components/Detail';
import { useConfirm } from 'material-ui-confirm';
import { extractUrlAndId } from './../utility/utils';
import { delPhoto, uploadFile } from '../utility/uploadFile';



export const Profile = () => {
    const { user, updateUser, msg, deleteAccount, logoutUser, setMsg } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState(null) //profilkép betöltése

    const [selectedAd, setSelectedAd] = useState(null); // kiválasztott hirdetés
    const [isDetailVisible, setIsDetailVisible] = useState(false); //Detail panel megjelenítése

    //ideiglenes userdata
    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        !user && navigate('/')
    }, [user])

    useEffect(() => {
        user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
    }, [user])

    const confirm = useConfirm()


    //Modosítás menü toggle
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);

    };

    //adatok betöltése rosszul (ebbe a formában azért nem megfelelő, mivel ez csak a user adatait olvassa ki és az extrán tárolt dolgokat nem (pl tel szám, cím))
    //a USER adati a firestore Auth-ban vannak tárolva ami ez esetben csak email meg displayname

    // const { register, handleSubmit, setValue } = useForm();

    // useEffect(() => {
    //   if (user) {
    //     setValue('displayName', user.displayName || '');
    //     setValue('phoneNumber', user.phoneNumber || 'Nem található');
    //     setValue('address', user.address || 'Nem található');
    //   }
    // }, [user]);

    //Felhasználó adatainak lekérése( ha nem müködne a tel. szám és a cím :(( )
    //Ez a megoldás azért optimálisabb mert a GetDoc a Users kollekciobol szedi ki az adatokat ezáltal a extra dolgokat is le lehet kérni ( tel szám, cím )
    const {
        register,
        handleSubmit,
        setValue, //Fontos!
        formState: { errors },
    } = useForm({
        defaultValues: {
            displayName: user?.displayName || "",
        },
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;

            const userDocRef = doc(db, 'Users', user.uid);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const data = docSnap.data();

                //Input mezőkhöz rendelt infók (remélhetőleg módosíthatóak lesznek )
                setValue('phoneNumber', data.phoneNumber || '');
                setValue('address', data.address || '');
                setValue('displayName', data.displayName || '');
            }
        };

        fetchUserData();
    }, [user, setValue]); //Setvalue setelés


    //Profil adatok módosítása

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // Ha van fájl, töltsük fel (pl. profilkép) később hasznos lesz by:nndr
            const file = data?.file ? data?.file[0] : null;
            const { url, id } = file ? await uploadFile(file) : {};

            // Frissítés Firestore-ban
            const userDocRef = doc(db, "Users", user.uid);
            await updateDoc(userDocRef, {
                displayName: data.displayName,
                phoneNumber: data.phoneNumber,
                address: data.address,
            });

            // Auth profil frissítés (eltérő a kollekciostól de profilnál hasznos lesz!! by: nndr)

            await updateUser(data.displayName, file ? url + "/" + id : null);

            console.log();


        } catch (error) {
            console.error("Profil frissítés hiba:", error);
        } finally {
            setLoading(false);
        }

    };


    //Egy hirdetés kiválasztása az általunk hirdetettek közül
    const handleAdSelect = (ad) => {
        setSelectedAd(ad); // Kiválasztott hirdetés beállítása
        setIsDetailVisible(true); // Detail panel megjelenítése
    };


    const handleDelete = async () => {
        try {
            const confirmed = await confirm({
                description: "Ez a művelet nem vonható vissza!",
                confirmationText: "Igen",
                cancellationText: "Mégsem",
                title: "Biztos ki szeretnéd törölni a fiókod?"
            })

            if (confirmed.confirmed == false) return;
            else {
                await deleteAccount()
                logoutUser()
                if (user.photoURL != null) delPhoto(user.photoURL.split("/").pop())
                navigate("/")
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Valódi hiba történt a fiók törlése közben:", error);
                setMsg({ type: "error", text: "Valami hiba történt a fiók törlése közben." });
            } else {
                // A felhasználó csak a Mégsem-re nyomott — itt szándékosan nem csinálunk semmit
            }
        }
    }

    return (
        <div className='md:flex lg:flex-row lg:items-stretch justify-center w-[100%] p-2 m-auto  gap-2  lg:w-[100%]'>
            <div className='shadow-[#7C7979] md:h-full items-center md:w-5/12 min-w-[10%] max-w-[100%] flex flex-col   mx-auto shadow-md p-4 rounded-lg bg-white space-y-2 mb-2'>
                <h1 className='tracking-wide text-xl'>Profil</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='text-center flex flex-col justify-center'>
                    
                    <div>
                        {avatar &&
                            <img
                                src={user && avatar ? avatar : "NoUser.jpg"}
                                alt="avatar img"
                                width={"50px"}
                                className='rounded-full object-cover mx-auto bg-white w-[50px] h-[50px] shadow shadow-gray-400/50'
                            />
                        }
                    </div>
                    <p>Jelenlegi felhasználónév:</p>
                    <input
                        {...register('displayName')}
                        defaultValue={user?.displayName || ''}
                        className='text-[#939393] mt-[-10px] text-center'
                        placeholder="Felhasználónév"
                        disabled
                    />

                    <div className='flex bg-BaseGreen items-center justify-center text-center rounded-md'>
                        <input
                            className='text-black  rounded-md flex mx-auto w-[80%] font-semibold'
                            type="file"
                            {...register('file', {
                                validate: (value) => {
                                    if (!value[0]) return true
                                    console.log(value);
                                    const acceptedFormats = ["jpg", "jpeg", "png"]
                                    const fileExtension = value[0].name.split(".").pop().toLowerCase()
                                    if (!acceptedFormats.includes(fileExtension)) return setMsg({ type: "error", text: "Hibás vagy nem elfogadható fájlformátum!" });
                                    if (value[0].size > 1 * 5000 * 1024) return setMsg({ type: "error", text: "A maximális fájlméret 5MB!" });
                                    return true
                                },
                            })}
                            onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className='mt-2 p-2.5 rounded-sm pl-6 pr-6 w-max mx-auto bg-BaseGreen font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center'>
                        {loading ? 'Mentés...' : 'Mentés'}
                    </button>
                </form>

                {/* További beállítások menü */}
                <button onClick={toggleMenu} className='p-1.5 text-md break-words rounded-sm bg-BaseGreen w-max font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center flex items-center sm:pl-5 sm:pr-5 pl-2 pr-0'>
                    További beállítások {isMenuOpen ? <GoTriangleUp className='text-3xl pt-1' /> : <GoTriangleDown className='text-3xl pt-1' />}
                </button>


                <form onSubmit={handleSubmit(onSubmit)} className={`${isMenuOpen ? 'block' : 'hidden'} w-max flex flex-col gap-y-2`}>

                    {/* Név módosítás */}
                    <div className='border rounded-md border-gray-200 flex flex-col gap-y-2 p-2'>
                        <h1 className='text-lg'>Név módosítása</h1>
                        <input
                            {...register('displayName')}
                            type="text"
                            className='border-b border-BaseGreen outline-0 text-lg p-1 bg-gray-100 rounded-md'
                        />
                    </div>

                    {/* Telefonszám módosítás */}
                    <div className='border rounded-md border-gray-200 flex flex-col gap-y-2 p-2'>
                        <h1 className='text-lg'>Telefonszám módosítása</h1>
                        <input
                            {...register('phoneNumber')}
                            type="text"
                            className='border-b border-BaseGreen outline-0 text-lg p-1 bg-gray-100 rounded-md'
                        />
                    </div>

                    {/* Lakcím módosítás */}
                    <div className='border rounded-md border-gray-200 flex flex-col gap-y-2 p-2'>
                        <h1 className='text-lg'>Lakcím módosítás</h1>
                        <input
                            {...register('address')}
                            type="text"
                            className='border-b border-BaseGreen outline-0 text-lg p-1 bg-gray-100 rounded-md'
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className='mt-2 p-2.5 rounded-sm pl-6 pr-6 w-max mx-auto bg-BaseGreen font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center'>
                        {loading ? 'Mentés...' : 'Mentés'}
                    </button>

                    <button
                        onClick={handleDelete}
                        type="button"
                        disabled={loading}
                        className='mt-2 p-2.5 text-white rounded-sm pl-6 pr-6 bg-red-600 font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center'>
                        Profil törlése
                    </button>
                    {msg && <Toastify {...msg} />}
                </form>

            </div>

            <div className='shadow-[#7C7979] md:h-full md:w-full min-w-[10%] max-w-[100%]   mx-auto shadow-md p-4 rounded-lg bg-white space-y-2'>
                <h1 className='tracking-wide text-xl'>Hirdetéseid</h1>
                <p className='text-[#939393] mt-[-10px]'>Az összes hirdetésed</p>

                <div className='gap-1 sm:grid grid-cols-1'>

                    {/* A felhasználó által hirdetett hirdetések megjelenítése ! */}
                    {user && <UserAds userId={user.uid} onAdSelect={handleAdSelect} />}


                    {/* Detail panel megjelenítése, ha kiválasztottunk egy hirdetést */}
                    {isDetailVisible && selectedAd && (
                        <Detail ad={selectedAd} onClose={() => setIsDetailVisible(false)} />
                    )}


                </div>

            </div>



        </div>
    )
}


