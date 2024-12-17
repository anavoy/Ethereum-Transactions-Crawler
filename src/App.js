import React, { useState } from 'react';
import Navbar from './components/Navbar/navbar';
import WalletInput from './components/WalletInput/walletInput';
import Transactions from './components/Transaction/transaction';
import BlockRangeInput from './components/BlockRangeInput/blockRangeInput';
import TransactionList from './components/TransactionList/transactionList';
import DateBasedTransactions from './components/BalanceByDateInput/balanceByDate';
import {fetchTransactionsByRange,  fetchTransactionsByDate } from './api/ethApi';
import './App.css';

const App = () => {
  const [wallet, setWallet] = useState('');
  const [block, setBlock] = useState('');

  const [blockRangeTransactions, setBlockRangeTransactions] = useState([]);
  const [rangeError, setRangeError] = useState('');

  const [balance, setBalance] = useState(null);
  const [balanceError, setBalanceError] = useState('');

  const handleWalletSubmit = (walletAddress, startBlock) => {
    setWallet(walletAddress);
    setBlock(startBlock);
  };

  const handleBlockRangeSubmit = async (
    walletAddress,
    startBlock,
    endBlock
  ) => {
    setRangeError('');
    setBlockRangeTransactions([]);
    try {
      const data = await fetchTransactionsByRange(
        walletAddress,
        startBlock,
        endBlock
      );
      if (data.length === 0) {
        setRangeError('No transactions found for the specified range.');
      } else {
        setBlockRangeTransactions(data);
      }
    } catch (err) {
      setRangeError('An error occurred while fetching transactions.');
    }
  };

  const handleDateBasedSubmit = async (walletAddress, date) => {
    setBalanceError('');
    setBalance(null);

    try {
      const result = await fetchTransactionsByDate(walletAddress, date);
      if (result) {
        setBalance((result / 1e18).toFixed(4)); 
      } else {
        setBalanceError('Could not fetch balance. Please check the input.');
      }
    } catch (error) {
      setBalanceError('An error occurred while fetching the balance.');
    }
  };

  return (
    <div className='app'>
      <Navbar />

      <section id='home' className='home-section'>
        <h1>Ethereum Transactions Crawler</h1>
        <p>Explore detailed Ethereum transaction data quickly and easily.</p>
      </section>

      <section id='transactionExplorer' className='explorer-section'>
        <h2>Transaction Explorer</h2>
        <p>
          Enter a wallet address and starting block to explore transactions.
        </p>
        <WalletInput onSubmit={handleWalletSubmit} />
        {wallet && block && <Transactions wallet={wallet} startBlock={block} />}
      </section>

      <section id='rangeTransaction' className='block-range-section'>
        <h2>Block Range Transactions</h2>
        <p>
          Enter a wallet address and a range of blocks to fetch transactions.
        </p>
        <BlockRangeInput onSubmit={handleBlockRangeSubmit} />
        {rangeError && <p className='error'>{rangeError}</p>}
        {blockRangeTransactions.length > 0 && (
          <TransactionList transactions={blockRangeTransactions} />
        )}
      </section>

      <section id='dateBasedTransactions' className='date-based-section'>
        <h2>Date-Based Transactions</h2>
        <p>
          Enter a wallet address and date to fetch the balance at that time.
        </p>
        <DateBasedTransactions onSubmit={handleDateBasedSubmit} />
        {balanceError && <p className='error'>{balanceError}</p>}
        {balance && (
          <p className='balance-result'>
            Balance on the given date: <strong>{balance} ETH</strong>
          </p>
        )}
      </section>
    </div>
  );
};

export default App;
