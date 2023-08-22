import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({coffees, onDeletedCoffee}){
  const navigate = useNavigate();

  function coffeeDeleteHandler(coffee){
    fetch(`/coffees/${coffee.id}`, {
      method: 'DELETE'
    })
    .then((r) => {
      if (r.ok) {
        onDeletedCoffee(coffee)
      }
    })
  }

  return (
    <div>
      <button onClick={() => navigate('/coffees/new')}>Add Coffee</button>
      {coffees ? coffees.map((coffee) => {
        return (
          <div key={coffee.id}>
            <p>{coffee.name}</p>
            <button onClick={() => navigate(`/coffees/${coffee.id}/edit`)}>Edit</button>
            <button onClick={() => coffeeDeleteHandler(coffee)}>Delete</button>
          </div>
        )
      }) : <h1>Loading...</h1>}
    </div>
  );
}

export default Dashboard