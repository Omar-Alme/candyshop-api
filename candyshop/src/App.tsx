import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import SingleProduct from './pages/SingleProduct'

import './App.css'


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/product/:productID" element={<SingleProduct />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
