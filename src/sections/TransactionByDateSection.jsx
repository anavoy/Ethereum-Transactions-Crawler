import TextBlock from "../components/Text/text";
import React, {useState} from "react";
import {fetchTransactionsByDate} from "../api/ethApi";
import Loader from "../components/Loader/loader";
import TransactionList from "../components/TransactionList/transactionList";
import TransactionByDateForm from "../components/TransactionByDate/TransactionByDateForm";

const TransactionByDateSection = () => {
	const [wallet, setWallet] = useState('');

	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState('');


	const handleDateBasedSubmit = async (walletAddress, date) => {
		setWallet(walletAddress);

		setLoading(true);
		setError('');
		setTransactions([]);

		try {
			const data = await fetchTransactionsByDate(walletAddress, date);
			if (data.length === 0) {
				setError('Could not fetch balance. Please check the input.');
			} else {
				setTransactions(data);
			}
		} catch (error) {
			setError('An error occurred while fetching the balance.');
		} finally {
			setLoading(false);
		}
	};

	return (
			<section id='dateBasedTransactions' className='explorer-section'>
				<TextBlock type='h2' text='Date-Based Transactions' as='h2'/>
				<TextBlock
						text='Enter a wallet address and date to fetch the balance change at that date.'
						as='p'
				/>
				<TransactionByDateForm onSubmit={handleDateBasedSubmit}/>

				{loading !== null && (
						<div className='transactions'>
							{error && <p className='error'>{error}</p>}
							{loading ? (
									<Loader/>
							) : transactions.length > 0 ? (
									<TransactionList transactions={transactions} wallet={wallet}/>
							) : (
									<p className='no-transactions'>
										No transactions found for the given wallet and block.
									</p>
							)}
						</div>
				)}
			</section>
	)
}

export default TransactionByDateSection;
