import React from 'react';

import Button from '../Button';
import Loader from '../Loader';
import './index.scss';

const ProductCard = ({ product, addToCart, defaultCurrency, isLoading }) => {
  const { image_url, title, price } = product;
  return (
    <div className="product-card">
      <div className="image-container">
        <img
          src={image_url}
          alt={`Figure of ${title}`}
          className="product-image"
        />
      </div>
      <p className="title">{title}</p>
      {isLoading ? (
        <Loader size="fa-lg" />
      ) : (
        <p className="price">
          {defaultCurrency} {price}
        </p>
      )}

      <Button
        type="button"
        onClick={() => addToCart(product)}
        value="Add to Cart"
        className="add-to-cart-btn"
      />
    </div>
  );
};

export default ProductCard;
