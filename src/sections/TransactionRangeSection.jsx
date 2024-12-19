import TextBlock from "../components/Text/text";
import React, {useState} from "react";
import TransactionList from "../components/TransactionList/transactionList";
import {fetchTransactionsByRange} from "../api/ethApi";
import BlockRangeForm from "../components/BlockRangeInput/blockRangeForm";

const TransactionRangeSection = () => {
	const [wallet, setWallet] = useState('');

	const [blockRangeTransactions, setBlockRangeTransactions] = useState([]);
	const [rangeError, setRangeError] = useState('');


	const handleBlockRangeSubmit = async (
			walletAddress,
			startBlock,
			endBlock
	) => {
		setRangeError('');
		setBlockRangeTransactions([]);
		try {
			setWallet(walletAddress);
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

	return (
			<section id='rangeTransaction' className='explorer-section'>
				<TextBlock type='h2' text='Block Range Transactions' as='h2'/>
				<TextBlock
						text='Enter a wallet address and a range of blocks to fetch transactions.'
						as='p'
				/>
				<BlockRangeForm onSubmit={handleBlockRangeSubmit}/>
				{rangeError && <p className='error'>{rangeError}</p>}
				{blockRangeTransactions.length > 0 && (
						<TransactionList wallet={wallet} transactions={blockRangeTransactions}/>
				)}
			</section>
	)
}

export default TransactionRangeSection;
