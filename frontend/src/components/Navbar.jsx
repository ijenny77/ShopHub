import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const { user,logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () =>{
    logout()
    navigate('/login')
  }
  return (
    <div className={styles.mainNavbar}>
      <h1 className={styles.shop}>
        Shop<span className={styles.hub}>Hub</span>
      </h1>
      <div className={styles.navlinks}>
        <Link className={styles.link} to="/">Home</Link>
        <Link className={styles.link} to="/cart">Cart</Link>
        <Link className={styles.link} to="/orders">Orders</Link>
      </div>
      <p className={styles.cart}>🛒</p>
      {user ? (
        <>
          <span className={styles.username}>Hello, {user.name}</span>
          <Button className={styles.login} onClick={handleLogout}>Logout</Button>
        </>
      ):(
        <>
          <Button className={styles.login} onClick={()=>{navigate('/login')}}>Login</Button>
          <Button className={styles.register} onClick={()=>navigate('/register')}>Register</Button>
        </>
      )}  
    </div>
  );
};

export default Navbar;
