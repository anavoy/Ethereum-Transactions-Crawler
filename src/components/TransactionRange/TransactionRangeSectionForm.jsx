import React, {useState} from 'react';
import InputField from '../InputField/inputField';
import Button from '../Button/button';
import {validateWallet, validateBlock} from '../../utils/validators';

const TransactionRangeSectionForm = ({onSubmit}) => {
	const [wallet, setWallet] = useState('');
	const [startBlock, setStartBlock] = useState('');
	const [endBlock, setEndBlock] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const walletError = validateWallet(wallet.trim());
		const startBlockError = validateBlock(startBlock.trim());
		const endBlockError = validateBlock(endBlock.trim());

		if (walletError || startBlockError || endBlockError) {
			setError(
					`${walletError || ''} ${startBlockError || ''} ${endBlockError || ''}`.trim()
			);
			setLoading(false);
			return;
		}

		setError('');
		try {
			await onSubmit(wallet.trim(), startBlock.trim(), endBlock.trim());
		} catch (err) {
			setError('An error occurred while submitting.');
		} finally {
			setLoading(false);
		}
	};

	return (
			<div className="wallet-input">
				<form className='wallet-input__form' onSubmit={handleSubmit}>
					<InputField
							id='wallet'
							value={wallet}
							onChange={(e) => setWallet(e.target.value)}
							placeholder='Enter Ethereum Wallet Address'
							className={error ? 'input-error' : ''}
					/>
					<InputField
							id='startBlock'
							value={startBlock}
							onChange={(e) => setStartBlock(e.target.value)}
							placeholder='Enter Start Block'
							className={error ? 'input-error' : ''}
					/>
					<InputField
							id='endBlock'
							value={endBlock}
							onChange={(e) => setEndBlock(e.target.value)}
							placeholder='Enter End Block'
							className={error ? 'input-error' : ''}
					/>
					{error && (
							<p className='error'>
								<span className='error-icon'>⚠️</span>
								{error}
							</p>
					)}
					<Button type='submit' loading={loading}>
						Fetch Transactions
					</Button>
				</form>
			</div>
	);
};

export default TransactionRangeSectionForm;
