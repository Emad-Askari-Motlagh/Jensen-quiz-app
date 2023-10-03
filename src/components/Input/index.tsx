import React, { useState } from "react";
import { FaSearchengin } from "react-icons/fa";

import styles from "./input.module.scss";
interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  handleChange?: any;
  onBlur?: any;
  value?: string;
  width?: string;
}
export default function Input({
  label,
  placeholder,
  type,
  name,
  handleChange,
  onBlur,
  value,
  width,
}: InputProps) {
  return (
    <div className={styles.container}>
      <label htmlFor="name">{label}</label>
      <input
        type={type}
        onChange={handleChange}
        className={styles.input}
        placeholder={placeholder}
        name={name}
        onBlur={onBlur}
        value={value}
      />
    </div>
  );
}
