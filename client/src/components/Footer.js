import React from 'react'
import { Grid, Container } from '@mui/material'

function Footer(){

  return(
    <Grid
      item
      container
      sx={{ color: 'white', backgroundColor: '#363738', p: { xs: 2, md: 5 } }}>
      <Container maxWidth='xl'>
        <Grid container flexDirection='column'>
          
          <Grid item container spacing={1}>
            <Grid item xs={12} md={6}>
              contact
            </Grid>

            <Grid item container xs={12} md={6} spacing={2}>
              <Grid item xs={6} md={4}>
                hot coffees
                cold coffees
              </Grid>
              <Grid item xs={6} md={4}>
                soc
              </Grid>
            </Grid>
          </Grid>

          
          <Grid item>
            <hr />
          </Grid>

          bottom
        </Grid>
      </Container>
    </Grid>
  )
}

export default Footer