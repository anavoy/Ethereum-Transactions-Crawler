import fetchLatestBlock from './etherscanService.js';

fetchLatestBlock()
  .then((block) => console.log('Najnoviji blok je:', block))
  .catch((error) => console.error('Greška:', error));
