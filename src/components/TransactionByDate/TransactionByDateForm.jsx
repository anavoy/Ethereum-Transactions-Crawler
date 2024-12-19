import React, { useState } from 'react';
import InputField from '../InputField/inputField';
import Button from '../Button/button';
import { validateWallet, validateDate } from '../../utils/validators';

const TransactionByDateForm = ({onSubmit}) => {
  const [wallet, setWallet] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const walletError = validateWallet(wallet);
    const dateError = validateDate(date);

    if (walletError || dateError) {
      setError(`${walletError || ''} ${dateError || ''}`);
      setLoading(false);
      return;
    }

		setError('');
		try {
			await onSubmit(wallet, date);
		} catch (err) {
			setError('An error occurred during submission.');
		} finally {
			setLoading(false);
		}
  };

  return (
    <div className='wallet-input'>
      <form
        onSubmit={handleSubmit}
        className='wallet-input__form '
      >
        <InputField
          id='wallet'
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder='Enter Ethereum Wallet Address (case sensitive)'
          className={error ? 'input-error' : ''}
        />
        <InputField
          id='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder='Enter Date (YYYY-MM-DD)'
          className={error ? 'input-error' : ''}
        />
        <Button type='submit' loading={loading}>
          Fetch Transactions
        </Button>

        {error && (
          <p className='error'>
            <span className='error-icon'>⚠️</span> {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default TransactionByDateForm;
