import React, { useState } from 'react';
import InputField from '../InputField/inputField';
import Button from '../Button/button';
import './blockRangeInput.css';

const BlockRangeInput = ({ onSubmit }) => {
  const [wallet, setWallet] = useState('');
  const [startBlock, setStartBlock] = useState('');
  const [endBlock, setEndBlock] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!wallet || !startBlock || !endBlock) {
      setError('All fields are required');
      return;
    }

    setError('');
    onSubmit(wallet, startBlock, endBlock);
  };

  return (
    <div className='block-range-input'>
      <form className='block-range-input__form' onSubmit={handleSubmit}>
        <InputField
          id='wallet'
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder='Enter Ethereum Wallet Address'
        />
        <InputField
          id='startBlock'
          value={startBlock}
          onChange={(e) => setStartBlock(e.target.value)}
          placeholder='Enter Start Block'
        />
        <InputField
          id='endBlock'
          value={endBlock}
          onChange={(e) => setEndBlock(e.target.value)}
          placeholder='Enter End Block'
        />
        {error && <p className='error'>{error}</p>}
        <Button type='submit'>Fetch Transactions</Button>
      </form>
    </div>
  );
};

export default BlockRangeInput;
