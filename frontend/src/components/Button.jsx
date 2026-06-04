import React from "react";
import styles from "./Button.module.css";
const Button = ({ className, children, onClick,type }) => {
  return (
    <div>
      <button className={`${styles.btn} ${className}`} onClick={onClick} type={type}>{children}</button>
    </div>
  );
};

export default Button;
