import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styles from "./Orders.module.css";
import { getMyOrders } from "../api/index.js";

const statusClass = {
  pending:    styles.pending,
  processing: styles.processing,
  shipped:    styles.shipped,
  delivered:  styles.delivered,
  cancelled:  styles.cancelled,
};

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getMyOrders().then(res => {
      setOrders(res.data)
      setLoading(false)}
    )
  }, [])
  if(loading) return <p style={{textAlign:'center',marginTop:'4rem'}}>Loading...</p>
  return (
    <div>
      <Navbar />
      <div className={styles.container}>

        {orders.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#78889A', marginTop: '4rem' }}>
            You have no orders yet.
          </p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className={styles.card}>
              <div className={styles.header}>
                <div>
                  <p className={styles.orderId}>Order #{order._id}</p>
                  <p className={styles.date}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`${styles.badge} ${statusClass[order.status]}`}>
                  {order.status}
                </span>
              </div>

              <div className={styles.items}>
                {order.items.map((item, i) => (
                  <div key={i} className={styles.item}>
                    <span>{item.name} × {item.quantity}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className={styles.total}>
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>

              <p className={styles.footer}>
                Shipped to: {order.shippedTo} · {order.payment}
              </p>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default Orders;
