import React, {useState, useEffect, createContext} from "react";

const CartContext = createContext();

function CartProvider({ children }){
  const [cart, setCart] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetch('/cart')
    .then(r => r.json())
    .then(cart => setCart(cart))
  }, []);

  return <CartContext.Provider value={{cart, setCart, cartOpen, setCartOpen}}> {children} </CartContext.Provider>;
}

export {CartContext, CartProvider };