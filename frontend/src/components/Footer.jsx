import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h4>ShopHub</h4>
            <p>Your trusted online shopping destination.</p>
          </div>
          <div className={styles.section}>
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="/cart">Cart</a>
            <a href="/orders">Orders</a>
          </div>
          <div className={styles.section}>
            <h4>Support</h4>
            <a href="#contact">Contact</a>
            <a href="#faq">FAQ</a>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; 2024 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;