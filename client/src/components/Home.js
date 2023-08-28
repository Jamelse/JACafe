import React from "react";
import homeCoffeeImg from '../images/homeCoffeeImg.webp'
import { Container, Grid, Typography, Box } from '@mui/material'
import HomeSlider from "./HomeSlider";


function Home({ coffees }){
  
  console.log(coffees?.slice(1).slice(-3))
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
      <img src={homeCoffeeImg} role='presentation' style={{ maxWidth: 700 }} className="homeImg"/>
    </Grid>
    <Box sx={{ backgroundColor: '#363738' }} className='background-box right'/>
  </Grid>
  </Container>
  <HomeSlider coffees={coffees}/>
 </>
  //  <div>
  //      {coffees ? coffees.map(coffee => {
  //       return (
  //         <div key={coffee.id}>
  //           <div className="coffeeDisplay" onClick={() => navigate(`/coffees/${coffee.id}`)}>
  //           <p>*coffee image*</p> 
  //           <p>{coffee.name}</p>
  //           <p>{coffee.price}</p>
  //           </div>
  //           </div>)
  //      }
  //       ) : "Loading.."} 
  //  </div>
  );
}

export default Home