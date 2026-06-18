import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../api";
import { useCart } from "../context/CartContext";
import styles from "./Checkout.module.css";
import toast from "react-hot-toast";

const Checkout = () => {
  const [shippedTo, setShippedTo] = useState('')
  const [payment,   setPayment]   = useState('Mobile Money')
  const navigate = useNavigate()
  const { items, clearCart } = useCart()
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createOrder({ shippedTo, payment })
    clearCart()
    navigate('/orders')
    toast.success('Order placed')
  }

  return (
    <div>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.container}>

          {/* Order Summary */}
          <div className={styles.summary}>
            <h2 className={styles.heading}>Order Summary</h2>
            {items.length === 0 ? (
              <p className={styles.empty}>Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div key={item.product._id} className={styles.item}>
                  <span>{item.product.name} × {item.qty}</span>
                  <span>${(item.product.price * item.qty).toFixed(2)}</span>
                </div>
              ))
            )}
            <hr className={styles.divider} />
            <div className={styles.total}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.heading}>Shipping & Payment</h2>

            <div className={styles.field}>
              <label className={styles.label}>Shipping Address</label>
              <input
                type="text"
                placeholder="e.g. Kigali, Rwanda"
                className={styles.input}
                value={shippedTo}
                onChange={(e) => setShippedTo(e.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Payment Method</label>
              <select
                className={styles.input}
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              >
                <option value="Mobile Money">Mobile Money</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>

            <button type="submit" className={styles.btn}>
              Place Order →
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Checkout;
