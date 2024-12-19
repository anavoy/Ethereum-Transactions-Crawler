import React from 'react';
import './inputField.css';

const InputField = ({ id, value, onChange, placeholder, className }) => {
  return (
    <input
      type='text'
      id={id}
      value={value}
      onChange={onChange}
      className={`input-field ${className}`} 
      placeholder={placeholder}
    />
  );
};

export default InputField;
