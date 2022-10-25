import { useReducer } from "react";
import CartContext from "./cart-context";

// * Default state for the cart
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// * Reducer for the cart
const cartReducer = (state, action) => {
  // * Add item to the cart
  if (action.type === "ADD") {
    // * Get the item from the action
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // * Check if the item is already in the cart by IDs
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // * Get the existing cart item from indexing the exisitng cart item
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    // * If the item is already in the cart
    if (existingCartItem) {
      // * Get the updated item
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      // console.log(updatedItems);
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    // * If the item is not in the cart
    else {
      updatedItems = state.items.concat(action.item);
    }

    // * Return the updated state
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  // * Remove item from the cart
  if (action.type === "REMOVE") {
    // * Check if the item is already in the cart by IDs
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    // * Get the existing cart item from indexing the exisitng cart item
    const existingItem = state.items[existingCartItemIndex];
    // * Get the updated total amount from subtract
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;

    // * If the item is already in the cart and remainder 1
    // * Delete the item from the cart
    if (existingItem.amount === 1) {
      // * Remove the item from the cart
      updatedItems = state.items.filter((item) => item.id !== action.id);
    }
    // * If the item amount more than 1 in the cart, subtract the amount decremental
    else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    // * Return the updated state
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  // * Use the reducer for the cart state
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  // * Function to add an item to the cart by action User
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  // * Function to remove an item from the cart by action User
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  // * Cart context
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
