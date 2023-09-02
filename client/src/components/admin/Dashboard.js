import React from "react";
import { Outlet } from "react-router-dom";
import { Grid, Container } from '@mui/material'
import AdNav from "../nav/AdNav";

function Dashboard(){
  

  return (
    <Container maxWidth='xl'>
      <Grid container className='profile-container' justifyContent='stretch'>
          <Grid item className='profile-menu' xs={12} md={4} lg={3}>
            <AdNav />
          </Grid>
          <Grid item container flexDirection='column' spacing={3} xs={12} md={8} lg={9}sx={{ p: 4 }}>
            <Outlet />
          </Grid>
        </Grid>
  </Container>
  );
}

export default Dashboard