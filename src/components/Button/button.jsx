import React from 'react';
import './button.css';

import Loader from "../Loader/loader";

const Button = ({ onClick, children, type = 'button', loading }) => {
	if (loading) {
		<Loader />
	}
  return (
    <button type={type} className='button' onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
