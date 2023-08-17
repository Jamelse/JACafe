import React from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useNavigate } from "react-router-dom";

function Home({ coffees }){
  const navigate = useNavigate();

  return (
   <div>
    <LoginForm />
       {coffees ? coffees.map(coffee => {
        return (
          <div className="coffeeDisplay"key={coffee.id}>
            <p>*coffee image*</p> 
            <p>{coffee.name}</p>
            <p>{coffee.price}</p>
            <button onClick={() => navigate(`/coffees/${coffee.id}`)}>Edit</button>
            </div>)
       }
        ) : "Loading.."} 
        <SignUpForm />
   </div>
  );
}

export default Home