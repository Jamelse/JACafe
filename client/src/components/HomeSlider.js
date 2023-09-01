import React from "react"
import {Grid, Typography, Container } from '@mui/material'
import CoffeeCards from "./CoffeeCards";

function HomeSlider({coffees}){

  return (
    <Grid item container sx={{ color: 'white', backgroundColor: '#b47a43', pt: 5, pb: 5 }}>
      <Container maxWidth='xl' sx={{ p: 0 }}>
        <Grid container flexDirection='column' spacing={3} alignItems='center'>
          <Grid item xs={12}>
            <Typography variant='h2' component='h2'>New on our menu</Typography>
          </Grid>
          <Grid item container sx={{ overflow: 'unset' }}>
            <CoffeeCards coffees={coffees?.slice(-3).reverse()} propColor={'#ffff'} />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

export default HomeSlider