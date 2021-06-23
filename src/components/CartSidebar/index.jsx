import React from 'react';
import Sidebar from '../Sidebar';
import Select from '../Select';
import CartProductCard from '../CartProductCard';
import Button from '../Button';
import Loader from '../Loader';
import './index.scss';

const CartSidebar = ({
  toggleSidebar,
  sidebar,
  currenciesArray,
  defaultCurrency,
  cart,
  totalPrice,
  removeFromCart,
  decrementProductinCartQuantity,
  incrementProductinCartQuantity,
  setDefaultCurrency,
  handleSelected,
  selected,
  isLoading,
}) => (
  <Sidebar onClose={toggleSidebar} isActive={sidebar} direction="right">
    <section className="add-to-cart-section">
      <header className="cart-header">
        <h2 className="cart-title">YOUR CART</h2>
      </header>

      <div className="currency-selector">
        {currenciesArray.length > 0 && (
          <Select
            options={currenciesArray}
            defaultSelectValue={defaultCurrency}
            updateSelected={(currency) => setDefaultCurrency(currency)}
            handleChange={handleSelected}
            selected={selected}
          />
        )}
      </div>

      <section className="cart-item-list">
        {cart.length > 0 &&
          cart.map((item) => (
            <CartProductCard
              key={item.id}
              decrement={decrementProductinCartQuantity}
              increment={incrementProductinCartQuantity}
              removeFromCart={removeFromCart}
              defaultCurrency={defaultCurrency}
              product={item}
              isLoading={isLoading}
            />
          ))}
      </section>

      <section className="summary-section">
        <div className="total-section">
          <p className="label">Subtotal</p>
          {isLoading ? (
            <Loader size="fa-lg" />
          ) : (
            <p className="value">
              {defaultCurrency ? `${defaultCurrency} ${totalPrice}` : ''}
            </p>
          )}
        </div>
        <Button
          type="button"
          onClick={() => {}}
          value="Add to Cart"
          className="checkout-btn"
        />
      </section>
    </section>
  </Sidebar>
);

export default CartSidebar;
