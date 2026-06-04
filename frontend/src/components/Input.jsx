import React from "react";
import styles from "./Input.module.css";

const Input = ({ type, placeholder, className, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${styles.input} ${className}`}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
