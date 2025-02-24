
// Validacija Ethereum wallet adrese
export const validateWallet = (wallet) => {
  const cleanedWallet = wallet.trim();

  if (!cleanedWallet) {
    return 'Wallet address is required.';
  }

  if (!/^0x[a-fA-F0-9]{40}$/.test(cleanedWallet)) {
    return 'Invalid Ethereum wallet address. It should start with "0x" followed by 40 hexadecimal characters.';
  }

  return null;
};

// Validacija broja bloka
export const validateBlock = (block) => {
  const cleanedBlock = block.trim();

  if (!cleanedBlock) {
    return 'Block number is required.';
  }

  if (isNaN(cleanedBlock)) {
    return 'Block number must be a number.';
  }

  const blockNumber = parseInt(cleanedBlock, 10);

  if (blockNumber < 0) {
    return 'Block number cannot be negative.';
  }

  return null;
};

// Validacija datuma u formatu YYYY-MM-DD
export const validateDate = (date) => {
  const cleanedDate = date.trim();

  if (!cleanedDate) {
    return 'Date is required.';
  }

  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(cleanedDate)) {
    return 'Invalid date format. Please use YYYY-MM-DD.';
  }

  return null;
};
