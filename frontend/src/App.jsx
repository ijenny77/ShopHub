import React from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders.jsx"
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Checkout from "./pages/Checkout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProductDetail from './pages/ProductDetail.jsx'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />  
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}></Route>
      <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}></Route>
      <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>}></Route>
      <Route path="/product/:id" element={<ProtectedRoute><ProductDetail/></ProtectedRoute>}></Route>
    </Routes>
  );
};

export default App;
