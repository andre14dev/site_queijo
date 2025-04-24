import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import OrderPage from './pages/OrderPage'
import NotFound from './pages/NotFound'

function App() {
  const [order, setOrder] = useState({
    name: '',
    categories: [],
    items: []
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage order={order} setOrder={setOrder} />} />
        <Route path="/produtos" element={<ProductsPage order={order} setOrder={setOrder} />} />
        <Route path="/pedido" element={<OrderPage order={order} setOrder={setOrder} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App