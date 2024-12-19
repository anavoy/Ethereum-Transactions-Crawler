import React, { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import Modal from '../Modal/modal';
import './transactionList.css';

const TransactionList = ({ transactions, wallet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [listHeight, setListHeight] = useState(window.innerHeight - 100);


  useEffect(() => {
    const handleResize = () => {
      const newHeight = window.innerHeight - 100;
      setListHeight(newHeight > 0 ? newHeight : 200); // Minimalna visina
    };
    handleResize();
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

		const received = wallet.toLowerCase() === transaction.to.toLowerCase();

		const formatedDate = new Date(transaction.timeStamp*1000).toISOString().split(".")[0].replace('T', ' ');

    return (
      <div
        key={transaction.hash}
        className='transaction-row'
        style={style}
        onClick={() => handleRowClick(transaction)}
        role='button'
        tabIndex={-1}
      >
        <span className='transaction-cell transaction-from'>
          <strong>From:</strong> {transaction.from}
        </span>
        <span className='transaction-cell transaction-to'>
          <strong>To:</strong> {transaction.to}
        </span>
        <span className={`transaction-cell transaction-amount ${received ? 'transaction-amount-positive' : 'transaction-amount-negative'}`}>
          {received ? "+": "-"}{roundedAmount} ETH
        </span>
        <span className='transaction-cell transaction-hash'>
					<strong>Date:</strong> {formatedDate} <br />
          <strong>Hash:</strong> {transaction.hash}
        </span>
      </div>
    );
  };

	const totalChange = transactions.reduce(
			(accumulator, currentValue) => {
				if (currentValue.from.toLowerCase() === wallet.toLowerCase()) {
					accumulator -= parseFloat(currentValue.value);
				} else {
					accumulator += parseFloat(currentValue.value);
				}

				return accumulator;
			},
			0,
	)

	const amountInETH = parseFloat(totalChange) / 1e18;
	const roundedAmount = amountInETH.toFixed(4);

  return (
			<div className='transaction-list-container'>
				<h2 className='transaction-header'>Total change: {roundedAmount > 0 ? "+" : "-"}{roundedAmount} ETH</h2>
				<h2 className='transaction-header'>Transactions list</h2>
				<div className='transaction-list'>
					<List
							height={Math.min(listHeight, 500)}
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
