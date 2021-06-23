import React from 'react';
import './index.scss';

const Button = ({
  className,
  type,
  onClick,
  value,
  children,
  props,
  style,
  disabled,
}) => (
  <button
    className={`btn${className ? ` ${className}` : ''} `}
    type={type}
    onClick={onClick}
    {...props}
    disabled={disabled}
    style={style}
  >
    {children ? children : value}
  </button>
);

export default Button;
