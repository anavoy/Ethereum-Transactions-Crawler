import fetch from 'node-fetch';

const fetchLatestBlock = async () => {
  const API_KEY = 'GFXS4GZHYDI7WQ22IGMJS8GYG4MQMSKV8W';
  const response = await fetch(
    `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${API_KEY}`
  );
  const data = await response.json();
  const latestBlock = parseInt(data.result, 16);
  return latestBlock;
};

export default fetchLatestBlock;
