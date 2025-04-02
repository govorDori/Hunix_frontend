import React from "react"

export const AddEditPost = () => {
    return (
        <div className="p-3 bg-BaseGreen flex flex-col items-center shadow-md shadow-black/30 rounded-md md:w-8/12 w-max max-w-3xl m-2 mx-auto text-center">

            <div>
                <h1>Hirdetés neve:</h1>
                <input
                    type="text"
                    className='border-b border-BaseGreen outline-0 text-xl p-1 bg-gray-100 rounded-md'
                    name="displayName"
                />
            </div>


            <div>
                <h1>Fotó a hirdetendő tárgyról:</h1>
                <input className="p-1 border rounded-md w-30 mx-auto" type="file" name="" id="" />
                {/* Ide jön a kiválasztott kép */}
                <img src="teszt" alt="" />
            </div>

            <div className="mt-3 flex-wrap flex-col flex gap-y-3 w-full  items-center">
                <input
                    type="text"
                    className='border-b w-max border-BaseGreen outline-0 text-md p-2 bg-gray-100 rounded-md'
                    name="brand"
                    placeholder="Márka"
                />

                <input
                    type="text"
                    className='border-b w-max border-BaseGreen outline-0 text-md p-2 bg-gray-100 rounded-md'
                    name="horsePower"
                    placeholder="Lóerő"
                />
                <input
                    type="text"
                    className='border-b w-max border-BaseGreen outline-0 text-md p-2 bg-gray-100 rounded-md'
                    name="engineSize"
                    placeholder="Motor"
                />
                <input
                    type="text"
                    className='border-b w-max border-BaseGreen outline-0 text-md p-2 bg-gray-100 rounded-md'
                    name="Kihasználtság"
                    placeholder="Kihasználtság"
                />
                <input
                    type="text"
                    className='border-b w-max border-BaseGreen outline-0 text-md p-2 bg-gray-100 rounded-md'
                    name="model"
                    placeholder="Model"
                />
                <input
                    type="text"
                    className='border-b w-full h-30 border-BaseGreen outline-0 text-sm p-1 bg-gray-100 rounded-md'
                    name="description"
                    placeholder="Autó leírása"
                />

                <button className="border p-2 rounded-md">Meghirdetem</button>

            </div>


        </div>
    )
}