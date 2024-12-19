import axios from 'axios';
import { logError } from '../utils/errorHandler';

const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
const baseUrl = 'https://api.etherscan.io/api';

/**
 * Generic function to fetch data from Etherscan API.
 * @param {Object} params - API parameters.
 * @returns {Promise<*>} - Returns API result or null if an error occurs.
 */
const fetchFromEtherscan = async (params) => {
  const url = `${baseUrl}?${new URLSearchParams({ ...params, apikey: apiKey })}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === '1') {
      return response.data.result;
    }

    logError('Etherscan API Response', response.data.message);
    return null;
  } catch (error) {
    logError('Etherscan API Request Failed', error);
    return null;
  }
};

/**
 * Fetch all transactions for a given wallet address starting from a block.
 * @param {string} walletAddress 
 * @param {number} startBlock 
 * @returns {Promise<*>} - Returns list of transactions or null.
 */
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

/**
 * Fetch transactions within a specific block range.
 * @param {string} walletAddress 
 * @param {number} startBlock 
 * @param {number} endBlock
 * @returns {Promise<*>} 
 */
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

/**
 * Fetch transactions for a given date by filtering based on timestamps.
 * @param {string} walletAddress 
 * @param {string} date 
 * @returns {Promise<*>} - Returns list of filtered transactions or an empty array.
 */
export const fetchTransactionsByDate = async (walletAddress, date) => {
  const startOfDayTimestamp = Math.floor(
    new Date(`${date}T00:00:00Z`).getTime() / 1000
  );
  const endOfDayTimestamp = Math.floor(
    new Date(`${date}T23:59:59Z`).getTime() / 1000
  );

  try {
    console.log(
      `Fetching transactions for wallet ${walletAddress} on ${date} (Timestamp range: ${startOfDayTimestamp} - ${endOfDayTimestamp})`
    );

    const transactions = await fetchFromEtherscan({
      module: 'account',
      action: 'txlist',
      address: walletAddress,
      startblock: 0,
      endblock: 99999999,
      sort: 'asc',
    });

    if (!transactions) {
      logError('fetchTransactionsByDate', 'No transactions found.');
      return [];
    }

    // Filter transactions based on the timestamp range
    const filteredTransactions = transactions.filter((tx) => {
      const txTimestamp = parseInt(tx.timeStamp, 10);
      return (
        txTimestamp >= startOfDayTimestamp && txTimestamp <= endOfDayTimestamp
      );
    });

    console.log(
      `Found ${filteredTransactions.length} transactions for the specified date.`
    );
    return filteredTransactions;
  } catch (error) {
    logError('fetchTransactionsByDate', error);
    return [];
  }
};
