
import React, { useState } from 'react';
import Navbar from './components/Navbar/navbar';


import TextBlock from './components/Text/text';
import './App.css';
import TransactionExplorerSection from "./sections/TransactionExplorerSection";
import TransactionRangeSection from "./sections/TransactionRangeSection";
import TransactionByDateSection from "./sections/TransactionByDateSection";

const App = () => {


  return (
    <div className='app'>
      <Navbar />

      <section id='home' className='home-section'>
        <TextBlock text='Discover Ethereum Transactions' as='h1' />
        <TextBlock
          text='Explore detailed Ethereum transaction data quickly and easily.'
          as='p'
        />
      </section>

      <TransactionExplorerSection />

      <TransactionRangeSection />

      <TransactionByDateSection />
    </div>
  );
};

export default App;
