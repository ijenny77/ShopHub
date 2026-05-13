import React from "react";
import styles from "./Button.module.css";
const Button = ({ className, children }) => {
  return (
    <div>
      <button className={`${styles.btn} ${className}`}>{children}</button>
    </div>
  );
};

export default Button;
