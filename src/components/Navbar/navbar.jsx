import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleMenuToggle = () => setToggleMenu(!toggleMenu);

  return (
    <div className='transaction__navbar'>
      <h1 className='transaction__navbar-logo'>
        Ethereum Transactions Crawler
      </h1>

      <div className='transaction__navbar-links'>
        <div className='transaction__navbar-links_container'>
          <p>
            <a href='#transactionExplorer'>Transaction Explorer</a>
          </p>
          <p>
            <a href='#rangeTransaction'>Block Range Transactions</a>
          </p>
          <p>
            <a href='#dateBasedTransactions'>Date-Based Transactions</a>
          </p>
        </div>
      </div>

      <div className='transaction__navbar-menu'>
        {toggleMenu ? (
          <RiCloseLine color='#fff' size={27} onClick={handleMenuToggle} />
        ) : (
          <RiMenu3Line color='#fff' size={27} onClick={handleMenuToggle} />
        )}

        {toggleMenu && (
          <div className='transaction__navbar-menu_container'>
            <p>
              <a href='#transactionExplorer' onClick={handleMenuToggle}>
                Transaction Explorer
              </a>
            </p>
            <p>
              <a href='#rangeTransaction' onClick={handleMenuToggle}>
                Block Range Transactions
              </a>
            </p>
            <p>
              <a href='#dateBasedTransactions' onClick={handleMenuToggle}>
                Date-Based Transactions
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
