import React from "react";
import Navbar from "../components/Navbar";
import styles from "./Orders.module.css";

const orders = [
  {
    id: "A3F9C1E2",
    date: "May 12, 2026",
    status: "Delivered",
    items: [
      { name: "Wireless Earbuds Pro", qty: 1, price: 59.99 },
      { name: "Travel Backpack 40L", qty: 2, price: 99.98 },
    ],
    shippedTo: "Kigali, Rwanda",
    payment: "Mobile Money",
  },
  {
    id: "B7D2F4A8",
    date: "May 10, 2026",
    status: "Shipped",
    items: [{ name: "Smart Watch Series 5", qty: 1, price: 199.0 }],
    shippedTo: "Kigali, Rwanda",
    payment: "Credit Card",
  },
  {
    id: "C1E8B3D5",
    date: "May 8, 2026",
    status: "Processing",
    items: [
      { name: "Nike Running Shoes", qty: 1, price: 89.0 },
      { name: "Vitamin C Serum", qty: 3, price: 59.97 },
    ],
    shippedTo: "Kigali, Rwanda",
    payment: "Cash on Delivery",
  },
];

const statusClass = {
  Delivered: styles.delivered,
  Shipped: styles.shipped,
  Processing: styles.processing,
};

const Orders = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        {orders.map((order) => {
          const total = order.items.reduce((sum, item) => sum + item.price, 0);
          return (
            <div key={order.id} className={styles.card}>
              <div className={styles.header}>
                <div>
                  <p className={styles.orderId}>Order #{order.id}</p>
                  <p className={styles.date}>{order.date}</p>
                </div>
                <span className={`${styles.badge} ${statusClass[order.status]}`}>
                  {order.status}
                </span>
              </div>

              <div className={styles.items}>
                {order.items.map((item, i) => (
                  <div key={i} className={styles.item}>
                    <span>{item.name} × {item.qty}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className={styles.total}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <p className={styles.footer}>
                Shipped to: {order.shippedTo} · {order.payment}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
