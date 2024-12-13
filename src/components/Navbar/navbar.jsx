import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

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
          <RiCloseLine
            color='#fff'
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color='#fff'
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className='transaction__navbar-menu_container scale-up-center'>
            <div className='transaction__navbar-menu_container-links'>
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
        )}
      </div>
    </div>
  );
};

export default Navbar;
