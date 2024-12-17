import React from 'react';
import './button.css';

const Button = ({ onClick, children, type = 'button' }) => {
  return (
    <button type={type} className='button' onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
