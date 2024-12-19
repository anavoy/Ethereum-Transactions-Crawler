import TextBlock from "../components/Text/text";
import WalletInput from "../components/TransactionExplorer/transactionExplorer";
import Transactions from "../components/Transaction/transaction";
import React, {useState} from "react";

const TransactionExplorerSection = () => {
	const [wallet, setWallet] = useState('');
	const [block, setBlock] = useState('');


	const handleWalletSubmit = (walletAddress, startBlock) => {
		setWallet(walletAddress);
		setBlock(startBlock);
	};

	return (
			<section id='transactionExplorer' className='explorer-section'>
				<TextBlock type='h2' text='Transaction Explorer' as='h2'/>
				<TextBlock
						text='Enter a wallet address and starting block to explore transactions.'
						as='p'
				/>
				<WalletInput onSubmit={handleWalletSubmit}/>
				{wallet && block && <Transactions wallet={wallet} startBlock={block}/>}
			</section>
	)
}

export default TransactionExplorerSection;
