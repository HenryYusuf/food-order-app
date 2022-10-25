import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  // * Get the items from the CartContext
  const cartCtx = useContext(CartContext);

  // * total amount of the items in the cart
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  // * total number of items in the cart
  const hasItems = cartCtx.items.length > 0;

  // * Function to remove an item from the cart
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  // * Function to add an item to the cart
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };

  // * Map the items in the cart to CartItem components from CartContext datas
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {" "}
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}{" "}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
