import React, { useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./Register.module.css";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')
  const handleSubmit = async (e) =>{
    e.preventDefault()
    await register(name,email,password)
    navigate('/login')
  }
  return (
    <div>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.card}>
          <h2 className={styles.title}>Create an account</h2>
          <p className={styles.subtitle}>
            Join <span className={styles.brand}>ShopHub</span> today
          </p>

          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Full Name</label>
              <input 
              type="text" 
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Your name" 
              className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
              type="email" 
              placeholder="you@email.com" 
              className={styles.input} 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input 
              type="password" 
              placeholder="At least 6 characters" 
              className={styles.input}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className={styles.btn}>Create Account</Button>

            <p className={styles.login}>
              Already have an account?{" "}
              <a href="/login" className={styles.link}>Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
