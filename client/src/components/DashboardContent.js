import React from "react";
import { Grid, Typography } from '@mui/material'
import AdProd from "./AdProd";
import AdOrd from "./AdOrd";
import { useLocation } from "react-router-dom";

function DashboardContent({ header, coffees, onDeletedCoffee }){
  const location = useLocation();

  return (
    <>
      <Grid item>
        <Typography component='h1' variant='h4' align='center' paddingTop>{header}</Typography>
      </Grid>

      {location.pathname.includes('products') && <AdProd coffees={coffees} onDeletedCoffee={onDeletedCoffee}/>} 
      {location.pathname.includes('orders') && <AdOrd/>}
    </>
  )
}

export default DashboardContent