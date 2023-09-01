import React from 'react'
import {Grid, Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material'
import { useNavigate } from "react-router-dom";


function CoffeeCards({coffees, propColor, hoverColor}){
  const navigate = useNavigate();
  return (
    <>
      {coffees?.map((coffee) => (
        <Grid item xs={12} md={12} lg={12} key={coffee.id}  className='card-container'>
        <Card elevation={0} square={true} className='carousel-card'>
          <CardActionArea onClick={() => navigate(`/coffees/${coffee.id}`)} className='card-actions'>
            <CardMedia component='img' image={coffee.image} alt={coffee.name} className="carousel-card-img"/>
            <CardContent>
              <Grid container spacing={1} sx={{ color: propColor, '&:hover': { color: hoverColor, transition: "all 0.3s ease 0s"}}} wrap='nowrap' alignItems='center' justifyContent='space-between'>
                <Grid item xs={12} md={10}>
                  <Typography variant="h5">{coffee.name}</Typography>
                </Grid>
                <Grid item xs={12} md='auto' textAlign='center'>
                  <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                    $ {coffee.price}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
        </Grid>
      ))}
    </>
  );
}

export default CoffeeCards