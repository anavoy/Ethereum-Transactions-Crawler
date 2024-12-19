import React, { useState } from 'react';
import { validateWallet, validateBlock } from '../../utils/validators';
import InputField from '../InputField/inputField';
import Button from '../Button/button';
import Loader from '../Loader/loader'; 


const TransactionExlorer = ({ onSubmit }) => {
  const [wallet, setWallet] = useState('');
  const [block, setBlock] = useState('');
  const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const trimmedWallet = wallet.trim();
    const trimmedBlock = block.trim();

    const walletError = validateWallet(trimmedWallet);
    const blockError = validateBlock(trimmedBlock);

    if (walletError || blockError) {
      setError(`${walletError || ''} ${blockError || ''}`.trim());
      setLoading(false);
      return;
    }

    setError('');
    try {
      await onSubmit(trimmedWallet, trimmedBlock);
    } catch (err) {
      setError('An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className='wallet-input__form' onSubmit={handleSubmit}>
      <InputField
        id='wallet'
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        placeholder='Enter Ethereum Wallet Address'
        className={error ? 'input-error' : ''}
      />
      <InputField
        id='block'
        value={block}
        onChange={(e) => setBlock(e.target.value)}
        placeholder='Enter Starting Block Number'
        className={error ? 'input-error' : ''}
      />
      {error && (
        <p className='error'>
          <span className='error-icon'>⚠️</span> {error}
        </p>
      )}
      <Button type='submit'>
        {loading ? <Loader /> : 'Fetch Transactions'}
      </Button>
    </form>
  );
};

export default TransactionExlorer;
