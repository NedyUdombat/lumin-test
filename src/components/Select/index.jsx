import React from 'react';
import './index.scss';

const Select = ({ options, selected, handleChange, style }) => (
  <select
    className="select"
    value={options.length === 0 ? '...' : selected}
    onChange={handleChange ? handleChange : () => {}}
    style={style}
  >
    {options.length === 0 && <option value="...">No options</option>}
    {options.map((option) => (
      <option value={option} key={option}>
        {option}
      </option>
    ))}
  </select>
);

export default Select;
