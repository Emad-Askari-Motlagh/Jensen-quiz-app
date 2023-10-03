import React, { useState, ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import { FaSearchengin } from "react-icons/fa";
import styles from "./input.module.scss";

interface SearchProps {
  placeholder?: string;
  type?: string;
  name?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onClick?: (word: string | undefined) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  label?: string;
  theme?: string;
  onSearch: (query: string) => void;
}

export default function Search({
  placeholder,
  type,
  name,
  onBlur,
  onClick,
  onFocus,
  onKeyDown,
  label,
  theme,
  onSearch,
}: SearchProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: theme === "light" ? "#484848" : "#f6f6f6" }}>
      <FaSearchengin size={37} className={styles.icon} />
      <input
        type={type}
        onChange={handleChange}
        className={styles.input}
        placeholder={placeholder}
        onFocus={onFocus}
        name={name}
        onBlur={onBlur}
        onKeyDown={onKeyDown}></input>
    </div>
  );
}
