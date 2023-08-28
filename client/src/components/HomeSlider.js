import React from "react"
import {Grid, Typography, Card, CardActionArea, CardMedia, CardContent, Container } from '@mui/material'
import { useNavigate } from "react-router-dom";

function HomeSlider({coffees}){
  const navigate = useNavigate();

  return (
    <Grid item container sx={{ color: 'white', backgroundColor: '#b47a43', pt: 5, pb: 5 }} className='carousel'>
    <Container maxWidth='xl' sx={{ p: 0 }}>
      <Grid container flexDirection='column' spacing={3} alignItems='center'>
        <Grid item xs={12}>
          <Typography variant='h2' component='h2'>New on our menu</Typography>
        </Grid>
        <Grid item container sx={{ overflow: 'unset' }}>
        {coffees?.slice(-3).reverse().map((coffee) => (
          <Grid item xs={12} md={12} lg={12} key={coffee.id}  className='carousel-card-container'>
          <Card elevation={0} square={true} className='carousel-card'>
            <CardActionArea onClick={() => navigate(`/coffees/${coffee.id}`)} className='card-actions'>
              <CardMedia component='img' image={coffee.image} alt={coffee.name}/>
              <CardContent>
                <Grid container spacing={1} sx={{ color: 'white'}} wrap='nowrap' alignItems='center' justifyContent='space-between'>
                  <Grid item xs={12} md={10}>
                    <Typography variant="h5">{coffee.name}</Typography>
                  </Grid>
                  <Grid item xs={12} md='auto' textAlign='center'>
                    <Typography variant="h6">
                      $ {coffee.price}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
          </Grid>
        ))} 
    </Grid>
      </Grid>
    </Container>
  </Grid>
    
  )
}

export default HomeSlider