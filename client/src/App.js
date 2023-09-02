import React, { useState, useEffect, useContext} from 'react';
import { UserContext } from './components/providers/UserProvider';
import { CartProvider } from './components/providers/CartProvider';
import {Route, Routes} from 'react-router-dom';
import AppContainer from './components/AppContainer';
import ProtectedRoute from './components/ProtectedRoute';
import LoginSignUpPage from './components/LoginSignUpPage';
import Home from './components/Home';
import EditCoffeeForm from './components/forms/EditCoffeeForm';
import Dashboard from './components/admin/Dashboard';
import DashboardContent from './components/admin/DashboardContent';
import CoffeeDetailPage from './components/CoffeeDetailPage';
import NewCoffeeForm from './components/forms/NewCoffeeForm';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import HotCoffeesPage from './components/HotCoffeesPage';
import ColdCoffeesPage from './components/ColdCoffeesPage';
import UserOrders from './components/UserOrders';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline'


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

  return (
    <div className="App">
      <ThemeProvider theme={createTheme(theme)}>
        <CssBaseline />
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
                <Route path='user/:id/orders' element={ 
                      <ProtectedRoute
                        redirectPath="/login"
                        isAllowed={user && !isAdmin}>
                          <UserOrders />
                      </ProtectedRoute>}/>
                <Route path='order-confirmation' element={ <Checkout /> }/>
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
                          <DashboardContent header='Orders'/>
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
      </ThemeProvider>
    </div>
  );
}

export default App;
