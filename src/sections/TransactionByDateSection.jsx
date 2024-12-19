import TextBlock from "../components/Text/text";
import React, {useState} from "react";
import {fetchTransactionsByDate} from "../api/ethApi";
import DateBasedTransactions from "../components/BalanceByDateInput/balanceByDate";

const TransactionByDateSection = () => {
	const [balance, setBalance] = useState(null);
	const [balanceError, setBalanceError] = useState('');

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
			<section id='dateBasedTransactions' className='explorer-section'>
				<TextBlock type='h2' text='Date-Based Transactions' as='h2'/>
				<TextBlock
						text='Enter a wallet address and date to fetch the balance at that time.'
						as='p'
				/>
				<DateBasedTransactions onSubmit={handleDateBasedSubmit}/>
				{balanceError && <p className='error'>{balanceError}</p>}
				{balance && (
						<p className='balance-result'>
							Balance on the given date: <strong>{balance} ETH</strong>
						</p>
				)}
			</section>
	)
}

export default TransactionByDateSection;
