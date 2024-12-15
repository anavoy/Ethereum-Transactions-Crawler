import React, { useState } from 'react';
import WalletInput from './components/WalletInput/walletInput';
import Transactions from './components/Transaction/transaction';
import Navbar from './components/Navbar/navbar';
import './App.css';
import TextBlock from './components/Text/text';

const App = () => {
  const [wallet, setWallet] = useState('');
  const [block, setBlock] = useState('');

  const resetState = () => {
    setWallet('');
    setBlock('');
  };

  const handleTransactionExplorerClick = () => {
    resetState();
  };

  const handleWalletSubmit = (walletAddress, startBlock) => {
    setWallet(walletAddress);
    setBlock(startBlock);
  };

  return (
    <div className='app'>
      <Navbar onTransactionExplorerClick={handleTransactionExplorerClick} />

      <div id='transactionExplorer'>
        <TextBlock text='View detailed Ethereum transaction data by entering a wallet address and starting block. Explore all transactions from the starting block to the current block, including addresses and ETH amounts, in a clear and readable format.' />
        <WalletInput onSubmit={handleWalletSubmit} />
        {wallet && block && <Transactions wallet={wallet} startBlock={block} />}
      </div>
    </div>
  );
};

export default App;
