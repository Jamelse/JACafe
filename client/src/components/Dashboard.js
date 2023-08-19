import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({coffees}){
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate('/coffees/new')}>Add Coffee</button>
      {coffees ? coffees.map((coffee) => {
        return (
          <div key={coffee.id}>
            <p>{coffee.name}</p>
            <button onClick={() => navigate(`/coffees/${coffee.id}/edit`)}>Edit</button>
          </div>
        )
      }) : <h1>Loading...</h1>}
    </div>
  );
}

export default Dashboard