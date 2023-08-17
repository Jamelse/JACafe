import React, { useState, useEffect }from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CoffeeDetailPage({ cart, setCart }){
  const {id} = useParams();
  const navigate = useNavigate();
  const [coffeeInfo, setCoffeeInfo] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch(`/coffees/${id}`)
    .then(r => r.json())
    .then(coffee => setCoffeeInfo(coffee))
  }, []);

  

 function handleAddToCart(){
    fetch(`/carts/${cart.id}`, {
      method: "PATCH",
      headers: {
       "Content-Type": "application/json",
      },
     body: JSON.stringify({
        coffee_id: coffeeInfo.id,
        quantity: 1
      }),
    })
    .then((r) => {
      if (r.ok){
        r.json()
        .then(updatedCart => setCart(updatedCart))
      } else {
        r.json()
        .then((err) => setErrors(err.errors));
      }
   });
  }
 


  console.log(coffeeInfo)
  return (
    <div className="editUserProfileContainer">
      {coffeeInfo ? <div>
      {/* <div className="errorsDiv">
      {errors.map(error => {
        return (
         <p className="errorMessage"><span className="material-icons">priority_high</span>{error}</p>
        )
      })}
    </div> */}
      <img src={coffeeInfo.image} />
      <h2>{coffeeInfo.name}</h2>
      <p>{coffeeInfo.description}</p>
      <p>{coffeeInfo.price}</p>
      <br/>
      {coffeeInfo.coffee_detail ? 
      <div>
        <h3>What's Included</h3>
        <ul>
          <li>Espresso Shots: {coffeeInfo.coffee_detail.espresso_shots}</li>
          <li>Milk: {coffeeInfo.coffee_detail.milk} Milk</li>
          <li>Syrup: {coffeeInfo.coffee_detail.syrup}</li>
          <li>Syrup Pumps: {coffeeInfo.coffee_detail.syrup_pumps} Pumps</li>
        </ul> 
      </div> : null}
      
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button className="cancelButton" onClick={() => navigate(-1)}>Cancel</button>
      </div> : <h1>Loading...</h1>}
    </div>
  )
}

export default CoffeeDetailPage