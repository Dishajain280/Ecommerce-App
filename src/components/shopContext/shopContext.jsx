import React, { createContext, useState } from "react";

const ShopContext = createContext();

import { productsData } from "../../assets/data.jsx";
import { toast } from "react-toastify";

export { ShopContext };

export const ShopContextProvider = ({ children }) => {
  const products = productsData;

  const [cart, setCart] = useState([]);

  const quantity = cart.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.amount;
  }, 0);

  const total = cart.reduce((accumulator, currentItem) => {
    const priceAsNumber = parseFloat(currentItem.price);
    if (isNaN(priceAsNumber)) {
      return accumulator;
    }
    return accumulator + priceAsNumber * currentItem.amount;
  }, 0);

  const addToCart = (product, id) => {
    const productId = typeof id === "string" ? parseInt(id, 10) : id;
    const newItem = { ...product, amount: 1 };

    const cartItem = cart.find((item) => {
      return item.id === productId;
    });

    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === productId) {
          return { ...item, amount: item.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
      toast.success("Product added to cart");
    }
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart empty");
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
    toast.success("Product removed from cart");
  };

  const increaseQuantity = (id) => {
    const productId = typeof id === "string" ? parseInt(id, 10) : id;
    const cartItem = cart.find((item) => {
      return item.id === productId;
    });
    if (!cartItem) return;
    const newCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, amount: cartItem.amount + 1 };
      } else {
        return item;
      }
    });
    setCart(newCart);
  };

  const decreaseQuantity = (id) => {
    const productId = typeof id === "string" ? parseInt(id, 10) : id;
    const cartItem = cart.find((item) => {
      return item.id === productId;
    });
    if (!cartItem) return;

    if (cartItem.amount < 2) {
      removeFromCart(productId);
      return;
    }

    const newCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, amount: cartItem.amount - 1 };
      } else {
        return item;
      }
    });
    setCart(newCart);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        quantity,
        total,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
