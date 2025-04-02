import React from 'react'

export const Garage = () => {
  return (
    <div className='shadow-[#7C7979] md:h-full md:w-full min-w-[10%] max-w-[100%]   mx-auto shadow-md p-4 rounded-lg bg-white space-y-2'>

    <div className=' md:h-full md:w-full min-w-[10%] max-w-[100%]   mx-auto   rounded-lg bg-white space-y-2'>
        <h1 className='tracking-wide text-xl'>Garázsod</h1>
        <p className='text-[#939393] mt-[-10px]'>Általad mentett autók</p>

        <div className='gap-1 sm:grid grid-cols-3'>

            <div className='border  rounded-md border-gray-300 w-full p-2'>
                <h1 className='text-2xl font-bold'>Auto neve: <span className='text-green-400'>BMW</span></h1>
                <img src="HunixTestCar.jpg" className='rounded-xl object-cover mt-2 mb-2 shadow-md shadow-black/30' alt="" />
                <p className='text-gray-400 break-words'>Leírás: Ez egy Hunix-os auto ami gyors és jo , NEM ELEKTROMOS, remek tökéletes fincsi</p>
                <h2>Lóerő: xyz</h2>
                <h2>Leírás: xyz</h2>
                
                <button className='mt-2 w-full h-max p-2.5 rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center'>
                    Megtekintés
                </button>

                <button className='mt-2 w-full h-max p-2.5 rounded-sm pl-6 pr-6 bg-BaseGreen font-semibold tracking-wider active:scale-95 transition-all cursor-pointer text-center'>
                    Törlés
                </button>
               
            </div>



        </div>

    </div>

</div>
  )
}


