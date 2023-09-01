import React from "react";
import homeCoffeeImg from '../images/homeCoffeeImg.webp'
import { Container, Grid, Typography, Box } from '@mui/material'
import HomeSlider from "./HomeSlider";


function Home({ coffees }){
  
  return (
    <>
    <Container maxWidth='xl'>
    <Grid
    container
    spacing={2}
    alignItems='center'
    justifyContent='center'>
    <Grid item container xs={12} md={6} flexDirection='column' spacing={5}>
      <Grid item xs={12}>
        <Typography variant='h1' className='homeTitle'>Your new favorite pick-me-up</Typography>
      </Grid>
      <Grid item container flexDirection='column'>
        <Grid item>
          <Typography variant='subtitle1' component='p' paddingBottom>about us</Typography>
        </Grid>
        <Grid item xs={12} lg={11}>
          <Typography>coffee</Typography>
        </Grid>
      </Grid>
    </Grid>
      <Grid item xs={12} md={6} lg={4} sx={{ order: { xs: -1, md: 1 } }} textAlign='center'>
        <img src={homeCoffeeImg} alt="Latte Heart" style={{ maxWidth: 700 }} className="homeImg"/>
      </Grid>
      <Box sx={{ backgroundColor: '#363738' }} className='background-box right'/>
    </Grid>
  </Container>
  <HomeSlider coffees={coffees}/>
 </>
  );
}

export default Home