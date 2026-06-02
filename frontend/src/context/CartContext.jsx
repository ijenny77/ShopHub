import { useState } from "react"
import React from 'react'
import Button from "../components/Button"
import styles from './CartContext.module.css'
const initialItems = [
  { id: 1, title: 'Wireless Earbuds Pro', price: 59.99,  qty: 1, emoji: '🎧', bg: '#EEF2FF' },
  { id: 2, title: 'Nike Running Shoes',   price: 89.00,  qty: 1, emoji: '👟', bg: '#FEFCE8' },
  { id: 3, title: 'Smart Watch Series 5', price: 199.00, qty: 1, emoji: '⌚', bg: '#FAF0FF' },
]

function CartContext(){
  const [items,setItems] = useState(initialItems)

  function increase(id){
    setItems(items.map(i => i.id === id ? {...i,qty:i.qty + 1} : i))
  }
  function decrease(id){
    setItems(items.map(i => i.id === id ? {...i,qty:Math.max(1, i.qty - 1 )} : i))
  }
  function remove(id){
    setItems(items.filter(i => i.id !== id))
  }
  return(
    <div className={styles.cartCards}>
      {items.map(i => (
        <div className={styles.cartCard}>
          <span className={styles.emoji}>{i.emoji}</span>
          <div className={styles.cartCardText}>
            <p>{i.title}</p>
            <p>{i.price}</p>
          </div>

          <div className={styles.qtyControls}>
            <button className={styles.decrease} onClick={() => decrease(i.id)}>-</button>
            <span>{i.qty}</span>
            <button className={styles.increase} onClick={() => increase(i.id)}>+</button>
          </div>
          <button className={styles.remove} onClick={()=>remove(i.id)}>Remove</button>
        </div>
      ))}
      <div className={styles.total}>
        <span className={styles.totalItems}>Subtotal (3 items) <p>$347.98</p> </span>
        <span className={styles.shipping}>Shipping <p style={{color:"#16A34A"}}>Free</p></span>
        <hr style={{color:'#a8a8a8'}} />
        <span className={styles.totalPrice}>Total <p>$347.98</p></span>
        <Button className={styles.proceed}>Proceed to Checkout →</Button>
      </div>
    </div>
  )
}

export default CartContext