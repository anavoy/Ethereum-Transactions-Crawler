import React from 'react';
import './text.css';

const TextBlock = ({ text, as = 'p' }) => {
  const Tag = as;

  return (
    <div className='description-text'>
      <Tag>{text}</Tag>
    </div>
  );
};

export default TextBlock;
