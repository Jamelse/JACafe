import React, {useState} from "react";

function CartNav({cart}){
  const [dropDown, setDropDown] = useState(false);
    
  return (
    <div className="cartPreviewDiv">
      <p onClick={() => setDropDown(!dropDown)}>Cart{cart.cart_items.length > 0 ? 
      cart.cart_items.map(item => item.quantity).reduce((a, b)=> a + b, 0) : 0}{ !dropDown ? <span>&#x25BE;</span> : <span>&#x25b4;</span>}</p>
          { dropDown ? 
          <ul className="dropdown">
            {cart.cart_items.length > 0 ? cart.cart_items.map(item => {
              return (
                <div className="cartItemDiv">
                  <li>
                    <img className="cartItemImg" src={item.item_summary.image}/>
                    <p>{item.item_summary.name}</p>
                    <p>{item.quantity}</p>
                    <p>{item.total_cost}</p>
                  </li>
                </div>
              )
            }) : <li>Cart is empty!</li>}
          </ul> : null}
    </div>
  )
}

export default CartNav