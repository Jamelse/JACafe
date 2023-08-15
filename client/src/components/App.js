import React, { useState, useEffect, useContext} from 'react';
import { UserContext } from './UserProvider';
import {Route, Routes} from 'react-router-dom';
import LoginForm from './LoginForm';
import Home from './Home';
import EditCoffeeForm from  './EditCoffeeForm'

function App() {
const {user, setUser} = useContext(UserContext);
const [coffees, setCoffees] = useState(null);

useEffect(() => {
  fetch('/coffees')
  .then(r => r.json())
  .then(coffee => setCoffees(coffee))
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
    }
  });
};

console.log(user)
  return (
    <div className="App">
      <button onClick={handleLogout}>Logout</button>
      <Routes>
        <Route path='/' element={<Home coffees={coffees}/> }></Route>
        <Route path='/login' element={ <LoginForm /> }></Route>
        <Route path='/coffees/:id' element={<EditCoffeeForm  handleSetCoffees={ handleSetCoffees }/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
