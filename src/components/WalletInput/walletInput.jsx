import React, { useState } from 'react';
import { validateWallet, validateBlock } from '../../utils/validators'; 
import './walletInput.css';

const WalletInput = ({ onSubmit }) => {
  const [wallet, setWallet] = useState('');
  const [block, setBlock] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedWallet = wallet.trim();
    const trimmedBlock = block.trim();

    const walletError = validateWallet(trimmedWallet);
    const blockError = validateBlock(trimmedBlock);

    if (walletError || blockError) {
      setError(walletError || blockError); 
      return;
    }

    setError('');
    onSubmit(trimmedWallet, trimmedBlock); 
  };

  return (
    <div className='wallet-input'>
      <form className='wallet-input__form' onSubmit={handleSubmit}>
        <input
          type='text'
          id='wallet'
          value={wallet}
          onChange={(e) => setWallet(e.target.value)} 
          placeholder='Enter Ethereum Wallet Address'
        />
        <input
          type='text'
          id='block'
          value={block}
          onChange={(e) => setBlock(e.target.value)} 
          placeholder='Enter Starting Block Number'
        />
        {error && <p className='error'>{error}</p>} 
        <button type='submit'>Fetch Transactions</button>
      </form>
    </div>
  );
};

export default WalletInput;
