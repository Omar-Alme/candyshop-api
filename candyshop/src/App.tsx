import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import SingleProduct from './pages/SingleProduct'
import Layout from './components/Layout'

function App() {

  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/product/:productID" element={<SingleProduct />} />
        </Routes>
      </Router>
    </Layout>
  )
}

export default App;
