import React from 'react';

import Button from '../Button';
import Loader from '../Loader';
import './index.scss';

const CartProductCard = ({
  product,
  removeFromCart,
  defaultCurrency,
  increment,
  decrement,
  isLoading,
}) => {
  const { image_url, title, price } = product;
  return (
    <div className="cart-product-card">
      <Button
        type="button"
        onClick={() => removeFromCart(product)}
        value="X"
        className="close-btn"
      />
      <div className="details">
        <h6 className="title">{title}</h6>
        <div className="bottom">
          <div className="quantity-section">
            <Button
              type="button"
              onClick={() => decrement(product)}
              value="-"
              className="counter-btn"
            />
            <p>{product.quantity}</p>
            <Button
              type="button"
              onClick={() => increment(product)}
              value="+"
              className="counter-btn"
            />
          </div>
          {isLoading ? (
            <Loader size="fa-lg" />
          ) : (
            <p className="price">
              {defaultCurrency} {price}
            </p>
          )}
        </div>
      </div>

      <div className="image-container">
        <img
          src={image_url}
          alt={`Figure of ${title}`}
          className="product-image"
        />
      </div>
    </div>
  );
};

export default CartProductCard;
