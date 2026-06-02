import React from "react";
import Navbar from "../components/Navbar";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.card}>
          <h2 className={styles.title}>Welcome back</h2>
          <p className={styles.subtitle}>
            Login to your <span className={styles.brand}>ShopHub</span> account
          </p>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              placeholder="you@email.com"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className={styles.input}
            />
          </div>

          <button className={styles.btn}>Login</button>

          <p className={styles.register}>
            No account?{" "}
            <a href="/register" className={styles.link}>
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
