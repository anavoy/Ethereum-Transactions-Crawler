import axios from 'axios';

const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;

const fetchFromEtherscan = async (params) => {
  const baseUrl = 'https://api.etherscan.io/api';
  const url = `${baseUrl}?${new URLSearchParams({ ...params, apikey: apiKey })}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === '1') {
      return response.data.result;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Etherscan API Error:', error.message);
    return null;
  }
};

export const fetchTransactions = async (walletAddress, startBlock) => {
  return fetchFromEtherscan({
    module: 'account',
    action: 'txlist',
    address: walletAddress,
    startblock: startBlock,
    endblock: 99999999,
    sort: 'asc',
  });
};

export const fetchTransactionsByRange = async (
  walletAddress,
  startBlock,
  endBlock
) => {
  return fetchFromEtherscan({
    module: 'account',
    action: 'txlist',
    address: walletAddress,
    startblock: startBlock,
    endblock: endBlock,
    sort: 'asc',
  });
};

export const fetchTransactionsByDate = async (walletAddress, date) => {
  const startOfDayTimestamp = Math.floor(
    new Date(date + 'T00:00:00Z').getTime() / 1000
  );
  const endOfDayTimestamp = Math.floor(
    new Date(date + 'T23:59:59Z').getTime() / 1000
  );

  console.log(
    `Requesting transactions for wallet: ${walletAddress} on ${date} (Timestamp: ${startOfDayTimestamp} - ${endOfDayTimestamp})`
  );

  const transactions = await fetchFromEtherscan({
    module: 'account',
    action: 'txlist',
    address: walletAddress,
    startblock: 0,
    endblock: 99999999,
    sort: 'asc',
  });

  if (transactions) {
    const filteredTransactions = transactions.filter((tx) => {
      const txTimestamp = parseInt(tx.timeStamp);
      return (
        txTimestamp >= startOfDayTimestamp && txTimestamp <= endOfDayTimestamp
      );
    });

    console.log(
      `Found ${filteredTransactions.length} transactions on the given date.`
    );
    return filteredTransactions;
  } else {
    console.log('No transactions found.');
    return [];
  }
};
