import React, { useState, useEffect, useContext} from 'react';
import { UserContext } from './UserProvider';
import { CartProvider } from './CartProvider';
import {Route, Routes} from 'react-router-dom';
import AppContainer from './AppContainer';
import ProtectedRoute from './ProtectedRoute';
import LoginSignUpPage from './LoginSignUpPage';
import Home from './Home';
import EditCoffeeForm from  './EditCoffeeForm'
import Dashboard from './Dashboard';
import DashboardContent from './DashboardContent';
import CoffeeDetailPage from './CoffeeDetailPage';
import NewCoffeeForm from './NewCoffeeForm';
import Cart from './Cart';
import Checkout from './Checkout';
import HotCoffeesPage from './HotCoffeesPage';
import ColdCoffeesPage from './ColdCoffeesPage';



function App() {
const {user, isAdmin} = useContext(UserContext);
const [coffees, setCoffees] = useState(null);

useEffect(() => {
  fetch('/coffees')
  .then(r => r.json())
  .then(coffee => setCoffees(coffee))
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
  console.log(user)
  return (
    <div className="App">
      <CartProvider>
          <AppContainer>
            <Routes>
            <Route index element={<Home coffees={coffees}/> }></Route>
            <Route path='home' element={<Home coffees={coffees}/>}></Route>
            <Route path='menu/hot-coffees' element={<HotCoffeesPage />}></Route>
            <Route path='menu/cold-coffees' element={<ColdCoffeesPage />}></Route>
            <Route path='login' element={ 
                  <ProtectedRoute
                    redirectPath="/home"
                    isAllowed={!user}>
                    <LoginSignUpPage />
                  </ProtectedRoute>}/>
            <Route path='checkout' element={ 
                  <ProtectedRoute
                    redirectPath="/login"
                    isAllowed={user && !isAdmin}>
                  </ProtectedRoute>}/>
            <Route path='order-confirmation' element={ 
                  <ProtectedRoute
                    redirectPath="/login"
                    isAllowed={user && !isAdmin}>
                  <Checkout />
                  </ProtectedRoute>}/>
            <Route path='cart' element={<Cart />}/>
            <Route path='coffees/:id' element={<CoffeeDetailPage/>}></Route>
            <Route path="dashboard" element={
                  <ProtectedRoute
                    redirectPath="/home"
                    isAllowed={!!isAdmin}>
                    <Dashboard />
                  </ProtectedRoute>}>
                  <Route path='products' element={
                      <ProtectedRoute
                        redirectPath="/home"
                        isAllowed={!!isAdmin}>
                      <DashboardContent header='Products' coffees={coffees} onDeletedCoffee={onDeletedCoffee}/>
                    </ProtectedRoute>}/>
                    <Route path='orders' element={
                      <ProtectedRoute
                        redirectPath="/home"
                        isAllowed={!!isAdmin}>
                      <DashboardContent header='Orders' coffees={coffees} onDeletedCoffee={onDeletedCoffee}/>
                    </ProtectedRoute>}/>
                  </Route>
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
        </AppContainer>
      </CartProvider>
    </div>
  );
}

export default App;
