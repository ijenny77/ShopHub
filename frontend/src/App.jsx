import React from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders"


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
};

export default App;
