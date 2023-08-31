import React, {useEffect, useState, useContext} from "react";
import { UserContext } from "./UserProvider";
import { CartContext } from "./CartProvider";
import { Grid, Typography, Container, Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";

function Checkout(){
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);
  const{cart, setCart} = useContext(CartContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const urlSearch =  new URLSearchParams(window.location.search);
      const sessionId = urlSearch.get('session_id');
      const cartItems = cart?.cart_items.map(item => item.id);
    if (cart?.cart_items.length > 0){
        handleOrderSuccess(sessionId, cartItems)
    }
  }, [user, cart])

  function handleOrderSuccess(session_id, items){
    fetch('/order-success', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id,
       items,
      })
    })
    .then(r => r.json())
    .then(newOrder => {
    
      setOrder(newOrder)
      setUser({...user, orders: [...user.orders, newOrder]})
      setCart({...cart, cart_total: 0, cart_items: []})
    })
  }
  const time = new Date()
  console.log(order)
  return (
    <Grid item container sx={{ backgroundColor: '#EEEEE' }}>
          <Container maxWidth='md' sx={{  pb: 4 }}>
            <Grid
              item
              container
              flexDirection='column'
              justifyContent='center'
              spacing={5}>
                <Grid item textAlign='center'>
                  <CheckCircleIcon sx={{fontSize: "100px"}} color="success"/>
                </Grid>
              <Grid item textAlign='center'>
                <Typography variant='h2' component='h1'>
                  Thank you for your order
                </Typography>
              </Grid>
              <Grid item textAlign='center'>
                <Typography variant='h3' component='h2'>
                  Estimated Pickup: {time.getHours()}:{time.getMinutes() + 15}
                </Typography>
              </Grid>

              <Grid item textAlign='center' justifySelf='center'>
               {order ?
                <Container
                maxWidth='sm'
                className='order'
                sx={{ background: '#363738', border: '1px solid #666', p: 5, color: "white" }}>
                <Grid item container spacing={1} flexDirection='column'>
                  <Grid item container alignItems='center' justifyContent='space-between'>
                    <Grid item>
                      <Typography variant='h5' component='p'>
                        <strong>Order Summary</strong>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{order.date}</Typography>
                    </Grid>
                  </Grid>
          
                  <Grid item container alignItems='center' justifyContent='space-between'>
                    <Grid item>
                      <Grid item container spacing={1}>
                        <Grid item>
                          <RunningWithErrorsIcon fontSize='medium' sx={{ color: 'grey' }}/> Processing
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
                                  <Typography variant='subtitle2'>
                                    <strong>{item?.item_summary.name}</strong>
                                  </Typography>
                                </Grid>
                                <Grid item container spacing={3}>
                                  <Grid item>
                                    <Typography className='small'>
                                      {item.item_summary.description}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Typography className='small'>Quantity: <strong>{item?.quantity}</strong></Typography>
                            </Grid>
                            <Grid item>
                              <Typography className='small' gutterBottom>
                                <strong>${item.item_price}</strong>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      <Divider color="white"/>
                      </>
                    ))}
                  </Grid>
          
                  <Grid item alignSelf='flex-end'>
                    <Typography>
                      <strong>Total: ${parseInt(order?.total)}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
                : 
                <CircularProgress color='inherit'/>} 
              </Grid>

              <Grid item textAlign='center'>
                <Button
                  onClick={() => navigate('/')}
                  variant='contained'
                  sx={{ backgroundColor: '#b47a43',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#A56F3D',
                    color: '#F0F3F4',},}}>
                  Continue Shopping
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>
  )
}

export default Checkout