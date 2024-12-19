import React from 'react';
import BlockRangeForm from './blockRangeForm';

const BlockRangeInput = ({ onSubmit }) => {
  return (
    <div className="wallet-input">
      <BlockRangeForm onSubmit={onSubmit} />
    </div>
  );
};

export default BlockRangeInput;
