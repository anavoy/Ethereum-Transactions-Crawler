export const validateWallet = (wallet) => {
  const cleanedWallet = wallet.trim().replace(/\s+/g, ' ');

  if (!cleanedWallet) {
    return 'Wallet address is required.';
  }

  if (!/^0x[a-fA-F0-9]{40}$/.test(cleanedWallet)) {
    return 'Invalid Ethereum wallet address. It should start with "0x" followed by 40 hexadecimal characters.';
  }

  return null;
};

export const validateBlock = (block) => {
  const cleanedBlock = block.trim().replace(/\s+/g, '');

  if (!cleanedBlock) {
    return 'Block number is required.';
  }

  if (isNaN(cleanedBlock)) {
    return 'Block number must be a number.';
  }

  const blockNumber = parseInt(cleanedBlock);

  if (blockNumber < 0) {
    return 'Block number cannot be negative.';
  }

  const maxBlock = 17000000;
  if (blockNumber > maxBlock) {
    return `Block number cannot exceed ${maxBlock}.`;
  }

  return null;
};
