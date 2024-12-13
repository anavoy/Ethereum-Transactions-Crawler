import axios from 'axios';

const fetchTransactions = async (walletAddress, startBlock) => {
  const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=${startBlock}&endblock=99999999&sort=asc&apikey=${apiKey}`;

  try {
    console.log('Fetching transactions from:', url); 
    const response = await axios.get(url);

    if (response.data.status === '1') {
      console.log('Transactions fetched successfully');
      return response.data.result;
    } else {
      console.error('Error in response:', response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching transactions:', error.message || error);
    return [];
  }
};

export default fetchTransactions;
