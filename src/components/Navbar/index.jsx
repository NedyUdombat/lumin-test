import React, { useState } from 'react';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';
import luminLogo from '../../assets/images/lumin-logo.png';
import Button from '../Button';
import Sidebar from '../Sidebar';
import Select from '../Select';

const Navbar = ({
  cartLength = 0,
  currenciesArray,
  defaultCurrencyValue,
  toggleCartSidebar,
  setDefaultCurrency,
  handleSelected,
  selected,
}) => {
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <nav className="navbar">
        <a href="/" className="brand">
          <img src={luminLogo} alt="Lumin Logo" className="logo" />
        </a>
        <div>
          <Button type="button" onClick={toggleSidebar} className="menu-btn">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </Button>
        </div>

        <ul className="nav-list">
          <li className="nav-list-item">
            <a href="/" className="nav-list-item-link">
              Shop
            </a>
          </li>
          <li className="nav-list-item">
            <a href="/" className="nav-list-item-link">
              Help
            </a>
          </li>
          <li className="nav-list-item">
            <a href="/" className="nav-list-item-link">
              Blog
            </a>
          </li>
          <div className="right ml-auto">
            <li className="nav-list-item">
              <a href="/" className="nav-list-item-link">
                Account
              </a>
            </li>
            <li className="nav-list-item cart-icon">
              <Button
                type="button"
                onClick={toggleCartSidebar}
                className="nav-list-item-link cart-link-btn"
              >
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                <span className="item-count">{cartLength}</span>
              </Button>
            </li>
            <li className="nav-list-item">
              {currenciesArray.length > 0 && (
                <Select
                  options={currenciesArray}
                  defaultSelectValue={defaultCurrencyValue}
                  updateSelected={(currency) => setDefaultCurrency(currency)}
                  handleChange={handleSelected}
                  selected={selected}
                />
              )}
            </li>
          </div>
        </ul>
      </nav>
      <Sidebar onClose={toggleSidebar} isActive={sidebar} direction="left">
        <nav className="side-nav">
          <ul className="nav-list">
            <li className="nav-list-item">
              <a href="/" className="nav-list-item-link">
                Shop
              </a>
            </li>
            <li className="nav-list-item">
              <a href="/" className="nav-list-item-link">
                Help
              </a>
            </li>
          </ul>
        </nav>
        <nav className="page-nav">
          <ul className="nav-list">
            <li className="nav-list-item">
              <a href="/" className="nav-list-item-link">
                Skin
              </a>
            </li>
            <li className="nav-list-item">
              <a href="/" className="nav-list-item-link">
                Hair &amp; Body
              </a>
            </li>
            <li className="nav-list-item">
              <a href="/" className="nav-list-item-link">
                Sets
              </a>
            </li>
            <li className="nav-list-item">
              <a href="/" className="nav-list-item-link">
                Accessories
              </a>
            </li>
            <li className="nav-list-item">
              <a href="/" className="nav-list-item-link">
                Shop All
              </a>
            </li>
          </ul>
        </nav>
      </Sidebar>
    </>
  );
};

export default Navbar;
