import React from "react";
import Navbar from "../components/Navbar";
import CartContext from "../context/CartContext";

const Cart = () => {
  return (
    <div>
      <Navbar/>
      <div style={{background:'#F8FAFC',paddingBottom:"8rem"}}>
        <p style={{textAlign:"center",fontWeight:700,fontSize:'1.5rem',padding:'2rem 0rem'}}>Your Cart</p>
        <CartContext/>
      </div>
    </div>
  )
};

export default Cart;
