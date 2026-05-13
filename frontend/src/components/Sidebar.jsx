import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
const Sidebar = () => {
  return (
    <div className={styles.mainSidebar}>
      <div className={styles.navlinks}>
        <Link className={styles.link} to="/">
          🏠Home
        </Link>
        <Link className={styles.link} to="/Product">
          📦Product
        </Link>
        <Link className={styles.link} to="/Cart">
          🛒Cart
        </Link>
        <Link className={styles.link} to="/Checkout">
          💳Checkout
        </Link>
        <Link className={styles.link} to="/Orders">
          📋Orders
        </Link>
        <Link className={styles.link} to="/Login">
          🔑Login
        </Link>
        <Link className={styles.link} to="/Register">
          ✍️Register
        </Link>
        <Link className={styles.link} to="/Success">
          ✅Success
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
