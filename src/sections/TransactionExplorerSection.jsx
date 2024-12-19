import TextBlock from "../components/Text/text";
import React, {useState} from "react";
import TransactionExplorerForm from "../components/TransactionExplorer/transactionExplorerForm";
import Loader from "../components/Loader/loader";
import TransactionList from "../components/TransactionList/transactionList";
import {fetchTransactions} from "../api/ethApi";

const TransactionExplorerSection = () => {
	const [wallet, setWallet] = useState('');

	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState('');


	const handleWalletSubmit = async (walletAddress, startBlock) => {
		setWallet(walletAddress);

		setLoading(true);
		setError('');
		setTransactions([])

		try {
			const data = await fetchTransactions(walletAddress, startBlock);
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


	return (
			<section id='transactionExplorer' className='explorer-section'>
				<TextBlock type='h2' text='Transaction Explorer' as='h2'/>
				<TextBlock
						text='Enter a wallet address and starting block to explore transactions up to newest block.'
						as='p'
				/>
				<TransactionExplorerForm onSubmit={handleWalletSubmit} onWallet/>


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

export default TransactionExplorerSection;
