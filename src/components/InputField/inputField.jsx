import React from 'react';
import './inputField.css';

const InputField = ({ id, value, onChange, placeholder }) => {
  return (
    <input
      type='text'
      id={id}
      value={value}
      onChange={onChange}
      className='input-field'
      placeholder={placeholder}
    />
  );
};

export default InputField;
