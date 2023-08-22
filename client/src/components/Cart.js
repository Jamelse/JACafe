import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart}){
  const navigate = useNavigate();

  function handleChange(e) {
    fetch(`/carts/${e.target.name}/new_quantity`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: e.target.value
      }),
    })
    .then(r => r.json())
    .then(updatedCart => setCart(updatedCart))
    
  };

  if (!cart) return <h1>Loading...</h1>
  return (
    <div>
      {cart.cart_items.length > 0 ? 
      <div>
        {cart.cart_items.map(item => {
          return (
            <div key={item.id}>
              <h2>{item.item_summary.name}</h2>
              <h3>${item.item_price}</h3>
              <select 
                      name={item.id}
                      onChange={handleChange}
                      value={item.quantity}>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                    </select>  
              <h2>{item.total_cost}</h2>
            </div>
        )})}
        <h1>{`Subtotal (${cart.cart_items.map(item => item.quantity).reduce((a, b)=> a + b, 0)} items):  $${cart.cart_total}`}</h1>
        <button onClick={() => navigate('/checkout')}>Checkout</button>
      </div>: <h1>Your Cart is empty</h1>}
    </div>
  )
};

export default Cart