import TextBlock from "../components/Text/text";
import React, {useState} from "react";
import TransactionList from "../components/TransactionList/transactionList";
import {fetchTransactionsByRange} from "../api/ethApi";
import TransactionRangeSectionForm from "../components/TransactionRange/TransactionRangeSectionForm";
import Loader from "../components/Loader/loader";

const TransactionRangeSection = () => {
	const [wallet, setWallet] = useState('');

	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState('');

	const handleBlockRangeSubmit = async (
			walletAddress,
			startBlock,
			endBlock
	) => {
		setWallet(walletAddress);

		setLoading(true);
		setError('');
		setTransactions([]);
		try {
			setWallet(walletAddress);
			const data = await fetchTransactionsByRange(
					walletAddress,
					startBlock,
					endBlock
			);
			if (data.length === 0) {
				setError('No transactions found for the specified range.');
			} else {
				setTransactions(data);
			}
		} catch (err) {
			setError('An error occurred while fetching transactions.');
		} finally {
			setLoading(false);
		}
	};

	return (
			<section id='rangeTransaction' className='explorer-section'>
				<TextBlock type='h2' text='Block Range Transactions' as='h2'/>
				<TextBlock
						text='Enter a wallet address and a range of blocks to fetch transactions.'
						as='p'
				/>
				<TransactionRangeSectionForm onSubmit={handleBlockRangeSubmit}/>

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

export default TransactionRangeSection;
