import React from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useNavigate } from "react-router-dom";

function Home({ coffees }){
  const navigate = useNavigate();

  return (
   <div>
       {coffees ? coffees.map(coffee => {
        return (
          <div key={coffee.id}>
            <div className="coffeeDisplay" onClick={() => navigate(`/coffees/${coffee.id}`)}>
            <p>*coffee image*</p> 
            <p>{coffee.name}</p>
            <p>{coffee.price}</p>
            </div>
            </div>)
       }
        ) : "Loading.."} 
   </div>
  );
}

export default Home