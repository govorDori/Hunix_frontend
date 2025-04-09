import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { readAllBrands } from './crudUtility'

export const BrandContext = createContext()

export const BrandProvider = ({children}) => {
  const [brands, setBrands] = useState(null)

  useEffect(()=>{
    readAllBrands(setBrands)
  },[])

  return (
    <BrandContext.Provider value={{brands}}>
      {children}
    </BrandContext.Provider>
  )
}