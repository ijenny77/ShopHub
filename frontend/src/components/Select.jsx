import React from "react";

const Select = ({ className, options, onChange, value }) => {
  return (
    <select
      style={{
        padding: "0.3rem 1.3rem",
        border: "1px solid #E2E8F0",
        borderRadius: "0.3rem",
      }}
      className={className}
      onChange={onChange}
      value={value}
    >
      {options.map((option, index) => {
        return (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
