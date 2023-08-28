import React, { useContext } from 'react'
import {useNavigate } from 'react-router-dom';
import { Grid, Toolbar, AppBar, Typography, Menu, MenuItem, IconButton, Button } from '@mui/material'
import { UserContext } from './UserProvider';
import CartNav from './CartNav';
import NavMenu from './NavMenu';
import NavUserMenu from './NavUserMenu';
import NavLogin from './NavLogin';

function NavBar({cart, setCart}){
  const {user, setUser, isAdmin, setIsAdmin} = useContext(UserContext);
  const navigate = useNavigate();
  
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
  
  return(
   
    <AppBar
      position='fixed'
      sx={{ color: 'text.primary',
      backgroundColor: '#ffff' }}>
      <Toolbar>
        <Grid container spacing={2} alignItems='flex-end'>
          <Grid item  textAlign='center' sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Button sx={{ color: 'text.primary'}} onClick={() => navigate('/home')}>JACafe</Button>
          </Grid>
          <Grid item xs={4} md={6} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            {!isAdmin && <NavMenu />}
          </Grid>
          <Grid
            item
            container
            alignItems='center'
            justifyContent='flex-end'
            flexWrap='nowrap'
            spacing={2}
            xs={43}
            md={5}>
            <Grid item >
              {!user  ? 
              <NavLogin />
              : <NavUserMenu handleLogout={handleLogout}/>}
            </Grid>
            <Grid item xs='auto'>
              {!isAdmin && <CartNav cart={cart} setCart={setCart}/>}
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  
    // <div className='navDiv'> 
    //   <ul>
    //     <li className='appTitle'><NavLink className='appNavTitle' to="/home">JACafe</NavLink></li>
    //     <li className='dropDownList'>{!user ? <NavLink to='/login'>Login/Sign-Up</NavLink>: <NavLink onClick={handleLogout} to='/login' className='dropDownItems'>Logout</NavLink>}</li>
    //     <li>{isAdmin ? <NavLink to="/dashboard/products">Admin Dashboard</NavLink> : <CartNav cart={cart} setCart={setCart}/>}</li>
    //   </ul>
    // </div>
  )
}

export default NavBar