import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Shop from './components/Shop'
import Product from './components/Product'
import Headbar from './components/Headbar'
import Account from './components/Account'

function App() {
  return (
    <Router>
      <Headbar />
      <Routes>
        <Route path="/" element={
          <div style={{ padding: '2rem' }}>
            <h1>Product Review App</h1>
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