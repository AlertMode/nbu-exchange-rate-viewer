import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RateSearch from './pages/RateSearch'
import CustomRate from './pages/CustomRate'
import NoPage from './pages/NoPage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/RateSearch" element={<RateSearch />} />
          <Route path="/CustomRate" element={<CustomRate />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
