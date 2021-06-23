import React from 'react';
import ProductCard from '../ProductCard';
import './index.scss';

const Products = ({
  currenciesArray,
  products,
  defaultCurrency,
  addToCart,
  isLoading,
}) => (
  <section className="products-section">
    {currenciesArray.length > 0 && (
      <div className="content">
        {products &&
          products.map((product) => (
            <ProductCard
              defaultCurrency={defaultCurrency}
              addToCart={addToCart}
              product={product}
              key={product.id}
              isLoading={isLoading}
            />
          ))}
      </div>
    )}
  </section>
);

export default Products;
