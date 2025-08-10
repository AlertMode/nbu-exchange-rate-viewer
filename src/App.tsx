import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import CustomRate from './pages/CustomRate'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import SearchRate from './pages/SearchRate'
import './sass/_styles.scss'

const App = () => {
  return (
    <div>
      <NavigationBar />
      <div className="nav-bar-overlap-prevention">
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
