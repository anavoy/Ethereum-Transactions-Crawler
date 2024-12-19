
import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../../api/ethApi';
import TransactionList from '../TransactionList/transactionList';
import Loader from '../Loader/loader';

const Transactions = ({ wallet, startBlock }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!wallet || !startBlock) return;

    const handleFetchTransactions = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchTransactions(wallet, startBlock);
        if (data.length === 0) {
          setError('No transactions found.');
        } else {
          setTransactions(data);
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    handleFetchTransactions();
  }, [wallet, startBlock]);

  return (
    <div className='transactions'>
      {error && <p className='error'>{error}</p>}
      {loading ? (
        <Loader />
      ) : transactions.length > 0 ? (
        <TransactionList transactions={transactions} wallet={wallet} />
      ) : (
        <p className='no-transactions'>
          No transactions found for the given wallet and block.
        </p>
      )}
    </div>
  );
};

export default Transactions;
