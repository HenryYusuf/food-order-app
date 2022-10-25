import React, { useState } from "react";
import Cart from "./components/Cart/Cart";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  // * State for the Cart
  const [cartIsShown, setCartIsShown] = useState(false);

  // * Function to show the Cart
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  // * Function to hide the Cart
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {/* Logic for close cart if cart showed */}
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
