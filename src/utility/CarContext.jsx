import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { readAllCars } from './crudUtility'

export const CarContext = createContext()

export const BrandProvider = ({children}) => {
  const [cars, setCars] = useState(null)

  useEffect(()=>{
    readAllCars(setCars)
  },[])

  return (
    <CarContext.Provider value={{cars}}>
      {children}
    </CarContext.Provider>
  )
}