// TextBlock.js
import React from 'react';
import './text.css'; 

const TextBlock = ({ text }) => {
  return (
    <div className='description-text'>
      <p>{text}</p>
    </div>
  );
};

export default TextBlock;
