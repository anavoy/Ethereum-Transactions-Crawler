// // import React, { useState } from 'react';
// // import InputField from '../InputField/inputField';
// // import Button from '../Button/button';
// // import { fetchTransactionsByDate } from '../../api/ethApi';
// // import './balanceByDate.css';

// // const DateBasedTransactions = () => {
// //   const [wallet, setWallet] = useState('');
// //   const [date, setDate] = useState('');
// //   const [transactions, setTransactions] = useState([]);
// //   const [error, setError] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setTransactions([]);

// //     if (!wallet || !date) {
// //       setError('Please enter a wallet address and date.');
// //       return;
// //     }

// //     try {
// //       const transactionsResult = await fetchTransactionsByDate(wallet, date);
      
// //       if (transactionsResult && transactionsResult.length > 0) {
// //         setTransactions(transactionsResult);
// //       } else {
// //         setError('No transactions found for the given date.');
// //       }
// //     } catch (err) {
// //       setError('An error occurred while fetching transactions.');
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <div className='date-based-transactions'>
// //       <form onSubmit={handleSubmit} className='date-based-form'>
// //         <InputField
// //           id='wallet'
// //           value={wallet}
// //           onChange={(e) => setWallet(e.target.value)}
// //           placeholder='Enter Ethereum Wallet Address'
// //         />
// //         <InputField
// //           id='date'
// //           value={date}
// //           onChange={(e) => setDate(e.target.value)}
// //           placeholder='Enter Date (YYYY-MM-DD)'
// //         />
// //         <Button type='submit'>Fetch Transactions</Button>
// //       </form>

// //       {error && <p className='error'>{error}</p>}

// //       {transactions.length > 0 && (
// //         <div className='transaction-list'>
// //           <h3>Transactions for {date}</h3>
// //           <ul>
// //             {transactions.map((tx) => (
// //               <li key={tx.hash}>
// //                 <p>
// //                   <strong>From:</strong> {tx.from}
// //                 </p>
// //                 <p>
// //                   <strong>To:</strong> {tx.to}
// //                 </p>
// //                 <p>
// //                   <strong>Amount:</strong>{' '}
// //                   {(parseFloat(tx.value) / 1e18).toFixed(4)} ETH
// //                 </p>
// //                 {tx.tokenSymbol && (
// //                   <p>
// //                     <strong>Token:</strong> {tx.tokenSymbol}
// //                   </p>
// //                 )}
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default DateBasedTransactions;


// import React, { useState } from 'react';
// import InputField from '../InputField/inputField';
// import Button from '../Button/button';
// import { fetchTransactionsByDate } from '../../api/ethApi';
// import './balanceByDate.css';
// import { validateWallet, validateDate } from '../../utils/validators';  // Importujte validator


// const DateBasedTransactions = () => {
//   const [wallet, setWallet] = useState('');
//   const [date, setDate] = useState('');
//   const [transactions, setTransactions] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setTransactions([]);
//     setLoading(true);


    
//     if (!wallet || !date) {
//       setError('Please enter a wallet address and date.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const transactionsResult = await fetchTransactionsByDate(wallet, date);

//       if (transactionsResult && transactionsResult.length > 0) {
//         setTransactions(transactionsResult);
//       } else {
//         setError('No transactions found for the given date.');
//       }
//     } catch (err) {
//       setError('An error occurred while fetching transactions.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='date-based-transactions'>
//       <form onSubmit={handleSubmit} className='date-based-form'>
//         <InputField
//           id='wallet'
//           value={wallet}
//           onChange={(e) => setWallet(e.target.value)}
//           placeholder='Enter Ethereum Wallet Address'
//           className={error ? 'input-error' : ''}
//         />
//         <InputField
//           id='date'
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           placeholder='Enter Date (YYYY-MM-DD)'
//           className={error ? 'input-error' : ''}
//         />
//         <Button type='submit'>
//           {loading ? 'Loading...' : 'Fetch Transactions'}
//         </Button>
//       </form>

//       {error && (
//         <p className='error'>
//           <span className='error-icon'>⚠️</span> {error}
//         </p>
//       )}

//       {transactions.length > 0 && (
//         <div className='transaction-list'>
//           <h3>Transactions for {date}</h3>
//           <ul>
//             {transactions.map((tx) => (
//               <li key={tx.hash}>
//                 <p>
//                   <strong>From:</strong> {tx.from}
//                 </p>
//                 <p>
//                   <strong>To:</strong> {tx.to}
//                 </p>
//                 <p>
//                   <strong>Amount:</strong>{' '}
//                   {(parseFloat(tx.value) / 1e18).toFixed(4)} ETH
//                 </p>
//                 {tx.tokenSymbol && (
//                   <p>
//                     <strong>Token:</strong> {tx.tokenSymbol}
//                   </p>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DateBasedTransactions;
import React, { useState } from 'react';
import InputField from '../InputField/inputField';
import Button from '../Button/button';
import { fetchTransactionsByDate } from '../../api/ethApi';
import { validateWallet, validateDate } from '../../utils/validators'; 

const DateBasedTransactions = () => {
  const [wallet, setWallet] = useState('');
  const [date, setDate] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTransactions([]);
    setLoading(true);

    const walletError = validateWallet(wallet);
    const dateError = validateDate(date);

    if (walletError || dateError) {
      setError(`${walletError || ''} ${dateError || ''}`);
      setLoading(false);
      return;
    }

    try {
      const transactionsResult = await fetchTransactionsByDate(wallet, date);

      if (transactionsResult && transactionsResult.length > 0) {
        setTransactions(transactionsResult);
      } else {
        setError('No transactions found for the given date.');
      }
    } catch (err) {
      setError('An error occurred while fetching transactions.');
      console.error(err);
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
          placeholder='Enter Ethereum Wallet Address'
          className={error ? 'input-error' : ''}
        />
        <InputField
          id='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder='Enter Date (YYYY-MM-DD)'
          className={error ? 'input-error' : ''}
        />
        <Button type='submit'>
          {loading ? 'Loading...' : 'Fetch Transactions'}
        </Button>

        {error && (
          <p className='error'>
            <span className='error-icon'>⚠️</span> {error}
          </p>
        )}
      </form>

      {transactions.length > 0 && (
        <div className='transaction-list'>
          <h3>Transactions for {date}</h3>
          <ul>
            {transactions.map((tx) => (
              <li key={tx.hash}>
                <p>
                  <strong>From:</strong> {tx.from}
                </p>
                <p>
                  <strong>To:</strong> {tx.to}
                </p>
                <p>
                  <strong>Amount:</strong>{' '}
                  {(parseFloat(tx.value) / 1e18).toFixed(4)} ETH
                </p>
                {tx.tokenSymbol && (
                  <p>
                    <strong>Token:</strong> {tx.tokenSymbol}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DateBasedTransactions;
