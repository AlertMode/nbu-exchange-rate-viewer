import React, { useState, useEffect } from 'react'
import NavigationBar from './components/NavigationBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { fetchDataFromJSON } from './components/modules/fetchDataFromJSON.js'
// import { cloneArray } from './components/modules/cloneArray.js'
import Home from './pages/Home'
import SearchRate from './pages/SearchRate'
import CustomRate from './pages/CustomRate'
import NoPage from './pages/NoPage'

const App = () => {
  const [actualCurrenyRate, setActualCurrencyRate] = useState('')

  useEffect( () => {
    fetchDataFromJSON('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json').then(data => {
      setActualCurrencyRate(data)
    })
  }, [])

  return (
    <div>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home rates={actualCurrenyRate}/>} />
          <Route path="/search-rate" element={<SearchRate />} />
          <Route path="/custom-rate" element={<CustomRate />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
