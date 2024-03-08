// DataContext.js
import React, { createContext, useState, useEffect } from 'react'

const DataContext = createContext()

const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    if (typeof window !== 'undefined') {
      // Load data from localStorage on component mount
      const storedData = localStorage.getItem('sharedData')

      return storedData ? JSON.parse(storedData) : null
    } else {
      return null
    }
  })

  const setSharedData = newData => {
    setData(newData)
  }

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sharedData', JSON.stringify(data))
    }
  }, [data])

  return <DataContext.Provider value={{ data, setSharedData }}>{children}</DataContext.Provider>
}

export { DataContext, DataProvider }
