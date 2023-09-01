import React, { useContext } from 'react'
import {useNavigate } from 'react-router-dom';
import { Grid, Toolbar, AppBar } from '@mui/material'
import JACafeLogo from '../images/JACafeLogo.png'
import { UserContext } from './UserProvider';
import CartNav from './CartNav';
import NavMenu from './NavMenu';
import NavUserMenu from './NavUserMenu';
import NavLogin from './NavLogin';

function NavBar(){
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
   
    <AppBar position='fixed' sx={{ color: 'text.primary', backgroundColor: '#ffff' }}>
      <Toolbar>
        <Grid container spacing={2} alignItems='flex-end' >
          <Grid item  textAlign='center' sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <img onClick={() => navigate('/home')} src={JACafeLogo} alt='logo' className='navLogo'/> 
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
              {!isAdmin && <CartNav/>}
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar