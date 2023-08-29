import React, {useEffect, useState} from "react";
import { Breadcrumbs, Typography, Container, Grid} from '@mui/material'
import CoffeeCards from "./CoffeeCards";


function ColdCoffeesPage(){
  const [coffees, setCoffees] = useState(null);
  
  useEffect(() => {
    fetch('/cold_coffees')
    .then(r => r.json())
    .then(coffee => setCoffees(coffee))
  }, []);

  return (
    <Grid container>
      <Container maxWidth='xl'>
        <Grid item container spacing={6} flexDirection='column'>
          <Grid
              item
              container
              spacing={2}
              alignItems='flex-end'
              justifyContent='space-between'>
              <Grid item container xs={12} sm='auto' justifyContent='center'>
                <Breadcrumbs
                  separator='/'
                  aria-label='breadcrumbs'>
                    <Typography>Menu</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Cold Coffees</Typography>
                </Breadcrumbs>
              </Grid>
              <Grid item container >
              <CoffeeCards coffees={coffees} hoverColor={'#b47a43'}/>
              </Grid>
          </Grid>
          </Grid>
      </Container>
    </Grid>
  )
}

export default ColdCoffeesPage