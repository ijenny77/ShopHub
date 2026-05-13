import React from "react";
import styles from "./Button.module.css";
const Button = ({ className, children, onClick }) => {
  return (
    <div>
      <button className={`${styles.btn} ${className}`} onClick={onClick}>{children}</button>
    </div>
  );
};

export default Button;
