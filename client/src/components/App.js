import React, { useState, useEffect, useContext} from 'react';
import { UserContext } from './UserProvider';
import {Route, Routes, useNavigate} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginForm from './LoginForm';
import Home from './Home';
import EditCoffeeForm from  './EditCoffeeForm'
import Dashboard from './Dashboard';
import CoffeeDetailPage from './CoffeeDetailPage';
import NewCoffeeForm from './NewCoffeeForm';

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

function handleSetCoffees(newCoffee){
  setCoffees([...coffees, newCoffee]);
};

  return (
    <div className="App">
      <button onClick={handleLogout}>Logout</button>
      {isAdmin ? <button onClick={() => navigate('/dashboard')}>Admin Dashboard</button> : <button>Cart</button>}
      <Routes>
      <Route index element={<Home coffees={coffees}/> }></Route>
      <Route path='home' element={<Home coffees={coffees}/>}></Route>
      <Route path='login' element={ <LoginForm /> }></Route>
      <Route path='coffees/:id' element={<CoffeeDetailPage cart={cart} setCart={setCart}/>}></Route>
      <Route path="dashboard" element={
            <ProtectedRoute
              redirectPath="/home"
              isAllowed={!!isAdmin}>
              <Dashboard coffees={coffees}/>
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
