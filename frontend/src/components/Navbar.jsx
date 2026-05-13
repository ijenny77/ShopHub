import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Button from "./Button";
const Navbar = () => {
  return (
    <div className={styles.mainNavbar}>
      <h1 className={styles.shop}>
        Shop<span className={styles.hub}>Hub</span>
      </h1>
      <div className={styles.navlinks}>
        <Link className={styles.link} to="/">
          Home
        </Link>
        <Link className={styles.link} to="/cart">
          Cart
        </Link>
        <Link className={styles.link} to="/orders">
          Orders
        </Link>
      </div>
      <p className={styles.cart}>🛒</p>
      <Button className={styles.login}>Login</Button>
      <Button className={styles.register}>Register</Button>
    </div>
  );
};

export default Navbar;
