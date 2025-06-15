import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddParcelForm from './components/AddParcelForm'
import ParcelList from './components/ParcelList'
import Shop from './components/Shop'
import Product from './components/Product'
import Headbar from './components/Headbar'
import { useState } from 'react'
import Account from './components/Account'

function App() {
  const [trackingNumbers, setTrackingNumbers] = useState([])

  const handleAdd = (number) => {
    setTrackingNumbers(prev => [...new Set([...prev, number])])
  }

  return (
    <Router>
      <Headbar />
      <Routes>
        <Route path="/" element={
          <div style={{ padding: '2rem' }}>
            <h1>Śledzenie Paczek</h1>
            <AddParcelForm onAdd={handleAdd} />
            <ParcelList trackingNumbers={trackingNumbers} />
          </div>
        } />
        <Route path="/account" element={<Account />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />

      </Routes>
    </Router>
  )
}

export default App