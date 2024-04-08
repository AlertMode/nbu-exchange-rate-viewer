import React, { useEffect } from 'react'
import NavigationBar from './components/NavigationBar'
import { Routes, Route } from 'react-router-dom'
import { fetchDataFromJSON } from './modules/fetchDataFromJSON'
import { useStore } from './store'
import Home from './pages/Home'
import SearchRate from './pages/SearchRate'
import CustomRate from './pages/CustomRate'
import NoPage from './pages/NoPage'
import './sass/_styles.scss'

const App = () => {

  const { setRates} = useStore()

  useEffect( () => {
    fetchDataFromJSON('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then(data => setRates(data))
    .catch(console.error)
  }, [])

  return (
    <div>
      <NavigationBar />
      <div className = 'nav-bar-overlap-prevention'>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search-rate" element={<SearchRate />} />
          <Route path="/custom-rate" element={<CustomRate />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
