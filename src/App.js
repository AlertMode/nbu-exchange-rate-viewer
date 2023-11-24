import React from 'react'
import NavigationBar from './components/NavigationBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SearchRate from './pages/SearchRate'
import CustomRate from './pages/CustomRate'
import NoPage from './pages/NoPage'

const App = () => {
  return (
    <div>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search-rate" element={<SearchRate />} />
          <Route path="/custom-rate" element={<CustomRate />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
