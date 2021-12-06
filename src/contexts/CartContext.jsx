import React, { useState } from "react";

export const CartContext = React.createContext();

export const CartProvider = (props) => {
  const [cart, changeCart] = useState(null);
  const [cartOpen, changeCartOpen] = useState(false);

  return (
    <CartContext.Provider
      value={{ cart, changeCart, cartOpen, changeCartOpen }}>
      {props.children}
    </CartContext.Provider>
  );
};
