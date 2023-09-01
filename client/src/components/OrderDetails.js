import React from 'react'
import { Grid, Typography, Container } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Divider from '@mui/material/Divider';

function OrderDetails({order}){
  return (
    <Grid item textAlign='center' justifySelf='center'>
      {order ?
        <Container maxWidth='sm' className='order' sx={{ background: '#363738', border: '1px solid #666', p: 5, color: "white" }}>
          <Grid item container spacing={1} flexDirection='column'>
            <Grid item container alignItems='center' justifyContent='space-between'>
              <Grid item>
                <Typography variant='h5' component='p'><strong>Order Summary</strong></Typography>
              </Grid>
              <Grid item>
                <Typography>{order.date}</Typography>
              </Grid>
                </Grid>
                <Grid item container alignItems='center' justifyContent='space-between'>
                  <Grid item>
                    <Grid item container spacing={1}>
                      <Grid item>
                        {order.status === 'Processing' ? (
                          <>
                            <Typography><RunningWithErrorsIcon fontSize='medium' sx={{ color: 'grey' }}/> <strong>Processing</strong></Typography>
                          </>):(
                          <>
                            <Typography sx={{color: "green"}}><CheckCircleIcon fontSize="medium" color="success"/> <strong>Completed</strong></Typography>
                          </>)}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ pb: 2 }}>
                  <Grid item container flexDirection='column' textAlign='left'>
                    <Grid item>
                      <Typography>{order?.user.first_name}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{order?.user.last_name}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container flexDirection='column' spacing={2}>
                  {order?.cart_items?.map((item) => (
                    <>
                      <Grid item container spacing={2}>
                        <Grid item xs={4}>
                          <img
                            src={item?.item_summary.image}
                            alt={item?.item_summary.name}
                            className='img-responsive'
                            />
                        </Grid>
                        <Grid item container xs={8} spacing={1} flexDirection='column'>
                          <Grid item container xs='auto'>
                            <Grid item container flexDirection='column' spacing={1}>
                              <Grid item>
                                <Typography variant='subtitle2'><strong>{item?.item_summary.name}</strong></Typography>
                              </Grid>
                              <Grid item container spacing={3}>
                                <Grid item>
                                  <Typography className='small'>{item.item_summary.description}</Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Typography className='small'>Quantity: <strong>{item?.quantity}</strong></Typography>
                          </Grid>
                          <Grid item>
                            <Typography className='small' gutterBottom><strong>${item.item_price}</strong></Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider color="white"/>
                    </>
                  ))}
                </Grid>
                <Grid item alignSelf='flex-end'>
                  <Typography><strong>Total: ${parseInt(order?.total)}</strong></Typography>
                </Grid>
              </Grid>
            </Container> : <CircularProgress color='inherit'/>} 
          </Grid>
  )
}

export default OrderDetails