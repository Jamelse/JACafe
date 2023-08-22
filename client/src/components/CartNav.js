import React, {useState} from "react";

function CartNav({cart, setCart}){
  const [dropDown, setDropDown] = useState(false);
    
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
  
  function navCartDelete(id){
    fetch(`/carts/${id}/delete_item`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      }, 
    })
    .then(r => r.json())
    .then(updatedCart => setCart(updatedCart))
  }
  
console.log(cart)

  return (
    <div className="cartPreviewDiv">
      <p onClick={() => setDropDown(!dropDown)}>Cart{cart && cart.cart_items ? 
      cart.cart_items.map(item => item.quantity).reduce((a, b)=> a + b, 0) : 0}{ !dropDown ? <span>&#x25BE;</span> : <span>&#x25b4;</span>}</p>
          { dropDown ? 
          <ul className="dropdown">
            {cart && cart.cart_items ? cart.cart_items.map(item => {
              return (
                <div className="cartItemDiv" key={item.id}>
                  <li>
                    <img className="cartItemImg" src={item.item_summary.image}/>
                    <p>{item.item_summary.name}</p>
                    <p>{item.item_price}</p>
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
                    <button onClick={() => navCartDelete(item.id)}>Delete</button>
                  </li>
                </div>
              )
            }) : <li>Cart is empty!</li>}
          </ul> : null}
    </div>
  )
}

export default CartNav