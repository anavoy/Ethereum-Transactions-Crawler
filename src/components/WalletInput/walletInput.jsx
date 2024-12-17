import React, { useState } from 'react';
import { validateWallet, validateBlock } from '../../utils/validators';
import InputField from '../InputField/inputField';
import Button from '../Button/button';
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
        <InputField
          id='wallet'
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder='Enter Ethereum Wallet Address'
        />
        <InputField
          id='block'
          value={block}
          onChange={(e) => setBlock(e.target.value)}
          placeholder='Enter Starting Block Number'
        />
        {error && <p className='error'>{error}</p>}
        <Button type='submit'>Fetch Transactions</Button>
      </form>
    </div>
  );
};

export default WalletInput;
