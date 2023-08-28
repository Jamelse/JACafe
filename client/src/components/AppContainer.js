import React, {useContext} from "react";
import { Grid } from '@mui/material'
import NavBar from "./NavBar";
import Footer from "./Footer";
import { UserContext } from './UserProvider';

function AppContainer({children, cart, setCart}){
  const {isAdmin} = useContext(UserContext);

  return (
    <Grid
    container
    flexDirection='column'
    justifyContent='space-between'
    sx={{ minHeight: '100vh' }}>
    <Grid item>
      <NavBar cart={cart} setCart={setCart}/>
    </Grid>
    <Grid item container sx={{ pt: 15, flexGrow: 1 }}>
      {children}
    </Grid>
    {!isAdmin && (
      <Grid item container>
        <Footer />
      </Grid>
    )}
  </Grid>
  )
}

export default AppContainer