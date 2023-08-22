import React, { useState, useEffect, useContext} from 'react';
import { UserContext } from './UserProvider';
import {Route, Routes} from 'react-router-dom';
import NavBar from './NavBar';
import ProtectedRoute from './ProtectedRoute';
import LoginSignUpPage from './LoginSignUpPage';
import Home from './Home';
import EditCoffeeForm from  './EditCoffeeForm'
import Dashboard from './Dashboard';
import CoffeeDetailPage from './CoffeeDetailPage';
import NewCoffeeForm from './NewCoffeeForm';
import Cart from './Cart';

function App() {
const {user, isAdmin} = useContext(UserContext);
const [coffees, setCoffees] = useState(null);
const [cart, setCart] = useState(null);

useEffect(() => {
  fetch('/coffees')
  .then(r => r.json())
  .then(coffee => setCoffees(coffee))

  fetch('/cart')
  .then(r => r.json())
  .then(cart => setCart(cart))
}, []);

function handleUpdateCoffees(updatedCoffee){
  setCoffees(coffees.map(
    coffee => coffee.id === updatedCoffee.id ? updatedCoffee : coffee))
};

function handleSetCoffeeDetail(newDetail){
  const updatedCoffees = coffees.map(coffee => {
    if (coffee.id === newDetail.coffee_id){
      return {...coffee, coffee_detail: newDetail}
    } else {
      return coffee 
    }
  })
  setCoffees(updatedCoffees)
};

function onDeletedCoffee(deletedCoffee){
  setCoffees(coffees.filter(coffee => coffee.id !== deletedCoffee.id))
}


function handleSetCoffees(newCoffee){
  setCoffees([...coffees, newCoffee]);
};

  return (
    <div className="App">
      <NavBar cart={cart} setCart={setCart}/>
      <Routes>
      <Route index element={<Home coffees={coffees}/> }></Route>
      <Route path='home' element={<Home coffees={coffees}/>}></Route>
      <Route path='login' element={ 
            <ProtectedRoute
              redirectPath="/home"
              isAllowed={!user}>
              <LoginSignUpPage />
            </ProtectedRoute>}/>
      <Route path='cart' element={<Cart cart={cart}/>}/>
      <Route path='coffees/:id' element={<CoffeeDetailPage cart={cart} setCart={setCart}/>}></Route>
      <Route path="dashboard" element={
            <ProtectedRoute
              redirectPath="/home"
              isAllowed={!!isAdmin}>
              <Dashboard coffees={coffees} onDeletedCoffee={onDeletedCoffee}/>
            </ProtectedRoute>}/>
      <Route path="coffees/:id/edit" element={
            <ProtectedRoute
              redirectPath="/home"
              isAllowed={!!isAdmin}>
              <EditCoffeeForm  handleSetCoffees={handleUpdateCoffees} handleSetCoffeeDetail={handleSetCoffeeDetail}/>
            </ProtectedRoute>}/>
      <Route path="coffees/new" element={
            <ProtectedRoute
              redirectPath="/home"
              isAllowed={!!isAdmin}>
              <NewCoffeeForm handleSetCoffees={handleSetCoffees} handleSetCoffeeDetail={handleSetCoffeeDetail}/>
            </ProtectedRoute>}/>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
    </div>
  );
}

export default App;
