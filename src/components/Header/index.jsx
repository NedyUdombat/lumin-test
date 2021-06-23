import React from 'react';
import Select from '../Select';
import './index.scss';

const Header = () => (
  <header className="header">
    <div className="content">
      <div>
        <h1 className="title">All Products</h1>
        <p>A 360&#176; look at Lumin</p>
      </div>
      <div className="select-form">
        <Select options={[]} />
      </div>
    </div>
  </header>
);

export default Header;
