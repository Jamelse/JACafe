import React from 'react'
import { Grid, Container, Typography, Link, MenuList, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Footer(){
  const navigate = useNavigate();
  return(
    <Grid
      item
      container
      sx={{ color: 'white', backgroundColor: '#363738', p: { xs: 2, md: 5 } }}>
      <Container maxWidth='xl'>
        <Grid container flexDirection='column'>
          <Grid item container spacing={1}>
            <Grid item xs={12} md={6}>
              <Grid item container spacing={2} flexDirection='column'>
                <Grid item>
                  <Typography component='p' variant='h4'>
                    Contact Us
                  </Typography>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item container flexDirection='column' xs={6} md={12} spacing={2}>
                    <Grid item>
                      <Link href='#' color='inherit'>support@jacafe.com</Link>
                    </Grid>
                    <Grid item>
                      Call:{' '}<Link href='#' color='inherit' underline='hover'>1-800-117-0202</Link>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} md={12}>
                    <Typography sx={{ fontWeight: 500 }}>Monday - Friday</Typography>
                    <Typography component='p'>8pm - 7pm CST</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12} md={6} spacing={2}>
              <Grid item xs={6} md={4}>
                <MenuList className='menu'>
                  <Typography variant='subtitle2' component='p'>Menu</Typography>
                  <MenuItem onClick={() => navigate('/menu/hot-coffees')}>Hot Coffees</MenuItem>
                  <MenuItem onClick={() => navigate('/menu/cold-coffees')}>Cold Coffees</MenuItem>
                </MenuList>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <hr />
          </Grid>
          <Grid item container spacing={2}>
            <Grid
              item
              xs={6}
              md={4}
              container
              sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Link href='https:/github.com/Jamelse' color='inherit' underline='hover' className='link-sm'>
                Website By: Jacob Amelse 
              </Link>
            </Grid>
            <Grid item xs={6} md={4} textAlign='center'>
              <Link href='#' color='inherit' underline='hover' className='link-sm'>
                Privacy Policy
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

export default Footer