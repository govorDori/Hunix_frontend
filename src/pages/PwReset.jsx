import React from "react"
import { useContext } from "react"
import { UserContext } from "../utility/UserContext"
import { Toastify } from "../components/Toastify"

export const PwReset = () => {
    const { msg, resetPassword } = useContext(UserContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log(data.get('email'));

        resetPassword(data.get('email'))
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='min-h-screen flex items-center justify-center p-4'>
                
                <div className="bg-white shadow-[#7C7979] shadow-md rounded-lg text-black w-full max-w-[300px] p-3 -mt-[300px]">
                    <div className='flex flex-col space-y-1'>
                        <h1 className='text-2xl tracking-wide font-bold text-center'>
                            Jelszó módosítás igénylése
                        </h1>
                        <h3 style={{ color: "var(--color1)", textAlign: "center" }}>írd be az emailed</h3>

                        <input
                            type="email"
                            className='border-b border-BaseGreen outline-0 text-xl p-1 bg-gray-100 rounded-md'
                            name="email"
                            placeholder="email"
                            required
                        />

                        <button type='submit' className='cursor-pointer active:scale-95 transition-all p-2 bg-BaseGreen rounded-md mt-4 mx-auto text-center w-full max-w-[200px]'>
                            Elfelejtett jelszó
                        </button>

                        {msg && <Toastify  {...msg} />}
                    </div>
                </div>
            </div>
        </form>
    )
}