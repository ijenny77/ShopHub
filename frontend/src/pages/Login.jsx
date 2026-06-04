import React, { useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./Login.module.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
const Login = () => {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {login} = useAuth()
  const handleSubmit = async (e) =>{
    e.preventDefault()
    await login(email,password)
    navigate('/')
  }
  return (
    <div>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.card}>
          <h2 className={styles.title}>Welcome back</h2>
          <p className={styles.subtitle}>
            Login to your <span className={styles.brand}>ShopHub</span> account
          </p>
          <form onSubmit={handleSubmit}>
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
                placeholder="••••••••"
                className={styles.input}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className={styles.btn}>Login</Button>
            <p className={styles.register}>
              No account?{" "}
              <a href="/register" className={styles.link}>
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
