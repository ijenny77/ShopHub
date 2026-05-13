import React from "react";
import styles from "./Input.module.css";

const Input = ({ type, placeholder, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${styles.input}${className}`}
    />
  );
};

export default Input;
