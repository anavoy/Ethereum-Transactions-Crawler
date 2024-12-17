// import React, { useState } from 'react';
// import { FixedSizeList as List } from 'react-window';
// import Modal from '../Modal/modal'; // Импорт компоненте за модал
// import './transactionList.css';

// const TransactionList = ({ transactions }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState(null);

//   const filteredTransactions = transactions.filter(
//     (tx) => parseFloat(tx.value) > 0
//   );

//   if (filteredTransactions.length === 0) {
//     return <p>No transactions found.</p>;
//   }

//   const handleRowClick = (transaction) => {
//     setSelectedTransaction(transaction);
//     setIsModalOpen(true);
//   };

//   const Row = ({ index, style }) => {
//     const transaction = filteredTransactions[index];
//     const amountInETH = parseFloat(transaction.value) / 1e18;
//     const roundedAmount = amountInETH.toFixed(4);

//     return (
//       <div
//         className='transaction-row'
//         style={style}
//         onClick={() => handleRowClick(transaction)}
//         role='button'
//         tabIndex={0}
//       >
//         <span className='transaction-cell transaction-from'>
//           <strong>From:</strong> {transaction.from}
//         </span>
//         <span className='transaction-cell transaction-to'>
//           <strong>To:</strong> {transaction.to}
//         </span>
//         <span className='transaction-cell transaction-amount'>
//           <strong>Value:</strong> {roundedAmount} ETH
//         </span>
//         <span className='transaction-cell transaction-hash'>
//           <strong>Hash:</strong> {transaction.hash}
//         </span>
//       </div>
//     );
//   };

//   return (
//     <>
//       <List
//         height={400}
//         itemCount={filteredTransactions.length}
//         itemSize={80}
//         width='100%'
//       >
//         {Row}
//       </List>
//       {isModalOpen && (
//         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//           <div>
//             <h3>Transaction Details</h3>
//             <p>
//               <strong>From:</strong> {selectedTransaction.from}
//             </p>
//             <p>
//               <strong>To:</strong> {selectedTransaction.to}
//             </p>
//             <p>
//               <strong>Amount:</strong>{' '}
//               {(parseFloat(selectedTransaction.value) / 1e18).toFixed(4)} ETH
//             </p>
//             <p>
//               <strong>Hash:</strong> {selectedTransaction.hash}
//             </p>
//           </div>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default TransactionList;

// import React, { useState, useEffect } from 'react';
// import { FixedSizeList as List } from 'react-window';
// import Modal from '../Modal/modal';
// import './transactionList.css';

// const TransactionList = ({ transactions }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [listHeight, setListHeight] = useState(window.innerHeight - 100);

//   useEffect(() => {
//     const handleResize = () => setListHeight(window.innerHeight - 100);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const filteredTransactions = transactions.filter(
//     (tx) => parseFloat(tx.value) > 0
//   );

//   if (filteredTransactions.length === 0) {
//     return <p>No transactions found.</p>;
//   }

//   const handleRowClick = (transaction) => {
//     setSelectedTransaction(transaction);
//     setIsModalOpen(true);
//   };

//   const Row = ({ index, style }) => {
//     const transaction = filteredTransactions[index];
//     const amountInETH = parseFloat(transaction.value) / 1e18;
//     const roundedAmount = amountInETH.toFixed(4);

//     return (
//       <div
//         className='transaction-row'
//         style={style}
//         onClick={() => handleRowClick(transaction)}
//         role='button'
//         tabIndex={0}
//       >
//         <span className='transaction-cell transaction-from'>
//           <strong>From:</strong> {transaction.from}
//         </span>
//         <span className='transaction-cell transaction-to'>
//           <strong>To:</strong> {transaction.to}
//         </span>
//         <span className='transaction-cell transaction-amount'>
//           <strong>Value:</strong> {roundedAmount} ETH
//         </span>
//         <span className='transaction-cell transaction-hash'>
//           <strong>Hash:</strong> {transaction.hash}
//         </span>
//       </div>
//     );
//   };

//   return (
//     <div className='transaction-list-container'>
//       <h2 className='transaction-header'>Ethereum Transactions</h2>
//       <div className='transaction-list'>
//         <List
//           height={listHeight}
//           itemCount={filteredTransactions.length}
//           itemSize={80}
//           width='100%'
//         >
//           {Row}
//         </List>
//       </div>
//       {isModalOpen && (
//         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//           <div>
//             <h3>Transaction Details</h3>
//             <p>
//               <strong>From:</strong> {selectedTransaction.from}
//             </p>
//             <p>
//               <strong>To:</strong> {selectedTransaction.to}
//             </p>
//             <p>
//               <strong>Amount:</strong>{' '}
//               {(parseFloat(selectedTransaction.value) / 1e18).toFixed(4)} ETH
//             </p>
//             <p>
//               <strong>Hash:</strong> {selectedTransaction.hash}
//             </p>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default TransactionList;

import React, { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import Modal from '../Modal/modal'; // Ako želiš modal za detalje transakcija
import './transactionList.css';

const TransactionList = ({ transactions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [listHeight, setListHeight] = useState(window.innerHeight - 100);

  useEffect(() => {
    const handleResize = () => setListHeight(window.innerHeight - 100);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredTransactions = transactions.filter(
    (tx) => parseFloat(tx.value) > 0
  );

  if (filteredTransactions.length === 0) {
    return <p>No transactions found.</p>;
  }

  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const Row = ({ index, style }) => {
    const transaction = filteredTransactions[index];
    const amountInETH = parseFloat(transaction.value) / 1e18;
    const roundedAmount = amountInETH.toFixed(4);

    return (
      <div
        className='transaction-row'
        style={style}
        onClick={() => handleRowClick(transaction)}
        role='button'
        tabIndex={0}
      >
        <span className='transaction-cell transaction-from'>
          <strong>From:</strong> {transaction.from}
        </span>
        <span className='transaction-cell transaction-to'>
          <strong>To:</strong> {transaction.to}
        </span>
        <span className='transaction-cell transaction-amount'>
          <strong>Value:</strong> {roundedAmount} ETH
        </span>
        <span className='transaction-cell transaction-hash'>
          <strong>Hash:</strong> {transaction.hash}
        </span>
      </div>
    );
  };

  return (
    <div className='transaction-list-container'>
      <h2 className='transaction-header'>Ethereum Transactions</h2>
      <div className='transaction-list'>
        <List
          height={listHeight}
          itemCount={filteredTransactions.length}
          itemSize={80}
          width='100%'
        >
          {Row}
        </List>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div>
            <h3>Transaction Details</h3>
            <p>
              <strong>From:</strong> {selectedTransaction.from}
            </p>
            <p>
              <strong>To:</strong> {selectedTransaction.to}
            </p>
            <p>
              <strong>Amount:</strong>{' '}
              {(parseFloat(selectedTransaction.value) / 1e18).toFixed(4)} ETH
            </p>
            <p>
              <strong>Hash:</strong> {selectedTransaction.hash}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TransactionList;
