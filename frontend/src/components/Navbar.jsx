import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import Button from "./Button";
import {useCart} from '../context/CartContext'
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const {items} = useCart()
  const { user,logout } = useAuth()
  const total = items.reduce((sum,i)=>sum + i.qty,0)
  const navigate = useNavigate()
  const handleLogout = () =>{
    logout()
    navigate('/login')
  }
  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className={styles.mainNavbar}>
      <h1 className={styles.shop}>
        Shop<span className={styles.hub}>Hub</span>
      </h1>
      <div className={styles.navlinks}>
        {user?.role === "admin" && (
          <NavLink className={({isActive}) => isActive ? styles.activeLink : styles.link} to="/admin/products">
            Admin
          </NavLink>
        )}
        <NavLink className={({isActive}) => isActive ? styles.activeLink : styles.link} to="/">Home</NavLink>
        <NavLink className={({isActive}) => isActive ? styles.activeLink : styles.link} to="/orders">Orders</NavLink>
      </div>
      <NavLink to="/cart" className={styles.cart}>🛒{total > 0 && <span className={styles.badge}>{total}</span>}</NavLink>
      {user ? (
        <>
          <Link to='/profile' className={styles.avatar}>{initials}</Link>
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
