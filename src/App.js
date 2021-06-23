import React, { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_PRODUCTS_QUERY } from './api/products';
import { GET_CURRENCIES_QUERY } from './api/currency';
import Header from './components/Header';
import Products from './components/Products';
import CartSidebar from './components/CartSidebar';
import Loader from './components/Loader';

const App = () => {
  const [cart, setCart] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currenciesArray, setCurrenciesArray] = useState([]);
  const [defaultCurrency, setDefaultCurrency] = useState();
  const [productsArray, setProductsArray] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [selected, setSelected] = useState();

  const products = useQuery(GET_PRODUCTS_QUERY, {
    variables: {
      currency: 'NGN',
    },
  });
  const [getUpdatedPrices, { data }] = useLazyQuery(GET_PRODUCTS_QUERY);

  const currencies = useQuery(GET_CURRENCIES_QUERY);

  useEffect(() => {
    if (products.data) {
      const allProducts = products.data.products.map((item) => ({
        ...item,
        basePrice: item.price,
      }));
      setProductsArray(allProducts);
    }
  }, [products]);

  useEffect(() => {
    if (currencies.data) {
      setCurrenciesArray(currencies.data.currency);
      setDefaultCurrency(
        currencies.data.currency.filter((currency) => currency === 'NGN')[0],
      );
      setSelected(
        currencies.data.currency.filter((currency) => currency === 'NGN')[0],
      );
    }
  }, [currencies]);

  useEffect(() => {
    if (data) {
      const allProducts = data.products.map((item) => ({
        ...item,
        basePrice: item.price,
      }));
      setProductsArray(allProducts);
      const newCart = cart.map((item) => {
        const cartItem = allProducts.find((elem) => item.id === elem.id);
        return {
          ...item,
          price: cartItem.price * item.quantity,
          basePrice: cartItem.basePrice,
        };
      });
      setCart(newCart);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    let price;
    if (cart.length > 0) {
      price = cart.reduce((a, b) => a + b.basePrice * b.quantity, 0);
    }
    setTotalPrice(price === undefined ? '0.00' : price);
  }, [cart]);

  const handleSelected = ({ target: { value } }) => {
    setSelected(value);
    setDefaultCurrency(value);
    setIsLoading(true);
    getUpdatedPrices({
      variables: {
        currency: value,
      },
    });
  };

  const toggleSidebar = () => setSidebar(!sidebar);

  const addToCart = (product) => {
    const clonedProduct = Object.assign({}, product);
    let updatedCart = [];

    const productExists = cart.find((item) => item.id === clonedProduct.id);
    if (productExists) {
      updatedCart = cart.map((item) => {
        if (item.id === clonedProduct.id) {
          item.quantity += 1;
          clonedProduct.quantity = item.quantity;
        }
        return item;
      });
      setCart([...updatedCart]);
    } else {
      clonedProduct.quantity = 1;
      setCart([...cart, clonedProduct]);
    }
    toggleSidebar();
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart([...updatedCart]);
  };

  const incrementProductinCartQuantity = (product) => {
    const productExists = cart.find((item) => item.id === product.id);
    let updatedCart = [];
    if (productExists) {
      updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          item.quantity += 1;
          item.price = item.quantity * item.basePrice;
        }
        return item;
      });
      setCart([...updatedCart]);
    }
  };

  const decrementProductinCartQuantity = (product) => {
    const productExists = cart.find((item) => item.id === product.id);
    let updatedCart = [];
    let itemQuantity;
    if (productExists) {
      updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          item.quantity -= 1;
          itemQuantity = item.quantity;
          item.price = item.quantity * item.basePrice;
        }
        return item;
      });
      setCart([...updatedCart]);

      if (itemQuantity <= 0) {
        removeFromCart(product);
      }
    }
  };

  return (
    <main className="App">
      <Navbar
        cartLength={cart.length}
        currenciesArray={currenciesArray}
        defaultCurrencyValue={defaultCurrency}
        toggleCartSidebar={toggleSidebar}
        setDefaultCurrency={setDefaultCurrency}
        handleSelected={handleSelected}
        selected={selected}
      />
      <CartSidebar
        toggleSidebar={toggleSidebar}
        sidebar={sidebar}
        currenciesArray={currenciesArray}
        defaultCurrency={defaultCurrency}
        cart={cart}
        totalPrice={totalPrice}
        removeFromCart={removeFromCart}
        decrementProductinCartQuantity={decrementProductinCartQuantity}
        incrementProductinCartQuantity={incrementProductinCartQuantity}
        setDefaultCurrency={setDefaultCurrency}
        handleSelected={handleSelected}
        selected={selected}
        isLoading={isLoading}
      />
      <Header />
      {products.loading && (
        <section className="loader">
          <Loader size="fa-3x" />
        </section>
      )}
      {products.data && (
        <Products
          defaultCurrency={defaultCurrency}
          products={productsArray}
          currenciesArray={currenciesArray}
          addToCart={addToCart}
          isLoading={isLoading}
        />
      )}
    </main>
  );
};

export default App;
