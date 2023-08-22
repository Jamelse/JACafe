import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({cart}){
  const navigate = useNavigate();
  console.log(cart)
  if (!cart) return <h1>Loading...</h1>
  return (
    <div>
      {cart.cart_items.length > 0 ? 
      <div>
        {cart.cart_items.map(item => {
          return (
            <div key={item.id}>
              <h2>{item.item_summary.name}</h2>
              <h1>{item.quantity}</h1>
              <h2>{item.total_cost}</h2>
            </div>
        )})}
        <button onClick={() => navigate('/')}>Checkout</button>
      </div>: <h1>Your Cart is empty</h1>}
    </div>
  )
};

export default Cart