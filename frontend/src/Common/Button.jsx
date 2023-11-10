import React from "react";
import { useSelector } from "react-redux";

const Button = ({ type, cssClass, label, handlerChange, disabled = false }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${cssClass}`}
      onClick={() => handlerChange(label)}
    >
      {" "}
      {label}{" "}
    </button>
  );
};

export default Button;
