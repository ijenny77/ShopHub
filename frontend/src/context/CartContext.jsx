import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCart,addToCart,removeFromCart,clearCart as clearCartApi ,updateCartItem} from '../api/index.js'
export const CartContext = createContext()

const CartProvider = ({children}) =>{
  const [items,setItems] = useState([])
  const fetchCart = async () => {
    const res = await getCart()
    setItems(res.data.items)
  }
  const updateItem = async (productId,quantity) => {
    await updateCartItem(productId,quantity)
    await fetchCart()
  }
  const addItem = async (productId,quantity) =>{
    await addToCart(productId,quantity)
    await fetchCart()
  }
  const removeItem = async (productId) => {
    await removeFromCart(productId)
    await fetchCart()
  }
  const clearCart = async () => {
    await clearCartApi()
    setItems([])
  }
  useEffect(()=>{
    fetchCart()
  },[])
  return(
    <CartContext.Provider value={{addItem,items,removeItem,clearCart,updateItem}}>
      {children}
    </CartContext.Provider>
  )
}
export const useCart = () => useContext(CartContext)
export default CartProvider