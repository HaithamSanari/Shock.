import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {
  // Cart application state
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Increase product quantity
  const increaseQty = () => {
    setQuantity((prevState) => prevState + 1);
  };

  // Decrease product quantity
  const decreaseQty = () => {
    setQuantity((prevState) => {
      if (prevState - 1 < 1) {
        return 1;
      } else {
        return prevState - 1;
      }
    });
  };

  // Add Product to Cart
  const onAdd = (product, quantity) => {
    // Total Price
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    //Increase total quantity
    setTotalQuantity((prevTotalQuantities) => prevTotalQuantities + quantity);

    // Check if the product is already in the cart
    const exist = cartItems.find((item) => item.slug === product.slug);

    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };
  //Remove product
  const onRemove = (product) => {
    // Total Price
    setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price);

    //Remove from total quantities
    setTotalQuantity((prevTotalQuantities) => prevTotalQuantities - 1);

    // Check if the product is already in the cart
    const exist = cartItems.find((item) => item.slug === product.slug);

    if (exist.quantity === 1) {
      // Remove the item from the cart if it equal 1
      setCartItems(cartItems.filter((item) => item.slug !== product.slug));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  };
  return (
    <Context.Provider
      value={{
        quantity,
        setQuantity,
        increaseQty,
        decreaseQty,
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        onAdd,
        onRemove,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
