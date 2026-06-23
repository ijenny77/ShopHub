import React from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import styles from "../context/CartContext.module.css";
import toast from "react-hot-toast";
import Button from "../components/Button";

const Cart = () => {
  const { items, removeItem, clearCart,updateItem,loading } = useCart()
  const navigate = useNavigate()
  
  if(loading) return <p style={{textAlign:'center',marginTop:'4rem'}}>Loading...</p>
  const validItems = items.filter(i => i.product)
  const total = validItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  return (
    <div>
      <Navbar />
      <div style={{ background: '#F8FAFC', paddingBottom: '8rem' }}>
        <p style={{ textAlign: 'center', fontWeight: 700, fontSize: '1.5rem', padding: '2rem 0rem' }}>
          Your Cart
        </p>

        {validItems.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#78889A', marginTop: '4rem' }}>
            Your cart is empty.
          </p>
        ) : (
          <div className={styles.cartCards}>
            {validItems.map((item) => (
              <div className={styles.cartCard} key={item.product._id}>
                <img src={item.product.image} alt={item.product.name} className={styles.cartImage} />
                <div className={styles.cartCardText}>
                  <p>{item.product.name}</p>
                  <p>${item.product.price.toFixed(2)}</p>
                </div>
                <div className={styles.qtyControls}>
                  <button className={styles.decrease} onClick={()=>item.quantity === 1 ? removeItem(item.product._id):updateItem(item.product._id,item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className={styles.increase} onClick={() => item.quantity < item.product.stock ? updateItem(item.product._id,item.quantity + 1) : toast.error('Not enough stock')}>+</button>
                </div>
                <button className={styles.remove} onClick={() => {
                  removeItem(item.product._id)
                  toast.success('Item removed')
                  }}>
                  Remove
                </button>
              </div>
            ))}

            <Button onClick = {()=>{
              clearCart(); toast.success("Cart cleared")
            }}>
              Clear Cart
            </Button>

            <div className={styles.total}>
              <span className={styles.totalItems}>
                Subtotal ({validItems.reduce((sum, i) => sum + i.quantity, 0)} items) <p>${total.toFixed(2)}</p>
              </span>
              <span className={styles.shipping}>
                Shipping <p style={{ color: '#16A34A' }}>Free</p>
              </span>
              <hr style={{ color: '#a8a8a8' }} />
              <span className={styles.totalPrice}>
                Total <p>${total.toFixed(2)}</p>
              </span>
              <button className={styles.proceed} onClick={() => navigate('/checkout')}>
                Proceed to Checkout →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart;
