import React, { useState, useEffect, useContext} from 'react';
import { UserContext } from './UserProvider';
import {Route, Routes, useNavigate} from 'react-router-dom';
import LoginForm from './LoginForm';
import Home from './Home';
import EditCoffeeForm from  './EditCoffeeForm'
import Dashboard from './Dashboard';

function App() {
const {user, setUser, isAdmin, setIsAdmin} = useContext(UserContext);
const [coffees, setCoffees] = useState(null);
const [cart, setCart] = useState(null);
const navigate = useNavigate();

useEffect(() => {
  fetch('/coffees')
  .then(r => r.json())
  .then(coffee => setCoffees(coffee))

  fetch('/cart')
  .then(r => r.json())
  .then(cart => setCart(cart))
}, []);

function handleSetCoffees(updatedCoffee){
  setCoffees(coffees.map(
    coffee => coffee.id === updatedCoffee.id ? updatedCoffee : coffee))
}

function handleLogout(){
  fetch("/logout", {
    method: "DELETE"
  })
  .then((r) => {
    if (r.ok){
      setUser(null);
      setIsAdmin(false);
      navigate('/');
    }
  });
};

console.log(cart)



  return (
    <div className="App">
      <button onClick={handleLogout}>Logout</button>
      {isAdmin ? <Dashboard /> : 
      <Routes>
      <Route path='/' element={<Home coffees={coffees}/> }></Route>
      <Route path='/login' element={ <LoginForm /> }></Route>
      <Route path='/coffees/:id' element={<EditCoffeeForm  handleSetCoffees={ handleSetCoffees }/>}></Route>
    </Routes>
    }
      
    </div>
  );
}

export default App;
