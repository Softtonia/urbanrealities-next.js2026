import React from 'react';
import styles from './AuthInput.module.css';

const AuthInput = ({ label, type = 'text', id, value, placeholder, onChange, error, ...rest }) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default AuthInput;
