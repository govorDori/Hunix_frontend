import React from "react"

export const PwReset = () => {
    return(
        <div className="shadow-md shadow-black/20 p-2 w-max rounded-md mx-auto flex flex-col gap-y-2">
            <h2 className='text-xl'>Email:</h2>
                            <input
                                type="text"
                                className='border-b border-BaseGreen outline-0 text-xl p-1 bg-gray-100 rounded-md'
                                name="displayName"
                            />
                            <button className="p-2 border rounded-md">Új jelszó igénylése</button>
        </div>
    )
}