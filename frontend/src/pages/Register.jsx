import React from "react";
import Navbar from "../components/Navbar";
import styles from "./Register.module.css";

const Register = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.card}>
          <h2 className={styles.title}>Create an account</h2>
          <p className={styles.subtitle}>
            Join <span className={styles.brand}>ShopHub</span> today
          </p>

          <div className={styles.field}>
            <label className={styles.label}>Full Name</label>
            <input type="text" placeholder="Your name" className={styles.input} />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input type="email" placeholder="you@email.com" className={styles.input} />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input type="password" placeholder="At least 6 characters" className={styles.input} />
          </div>

          <button className={styles.btn}>Create Account</button>

          <p className={styles.login}>
            Already have an account?{" "}
            <a href="/login" className={styles.link}>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
