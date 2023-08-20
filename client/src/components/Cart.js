import React from "react";

function Cart({cart}){

  console.log(cart)

  return (
    <div>
      {cart ? cart.cart_items.map(item => {
        return (
          <div key={item.id}>
            <h2>{item.item_summary.name}</h2>
            <h1>{item.quantity}</h1>
            <h2>{item.total_cost}</h2>
          </div>
        )
      }) : <h1>Loading...</h1>}
    </div>
  )
};

export default Cart