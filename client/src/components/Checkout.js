import React, {useEffect, useState, useContext} from "react";
import { UserContext } from "./UserProvider";
import { CartContext } from "./CartProvider";
import { Grid, Typography, Container, Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
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

  console.log(order)
  return (
    <Grid item container sx={{ backgroundColor: '#EEEEE' }}>
          <Container maxWidth='md' sx={{ pt: 4, pb: 4 }}>
            <Grid
              item
              container
              flexDirection='column'
              justifyContent='center'
              spacing={5}>
              <Grid item textAlign='center'>
                <Typography variant='h2' component='h1'>
                  Thank you for your order
                </Typography>
              </Grid>

              <Grid item textAlign='center' justifySelf='center'>
                {/* {order ?
                <Container
                maxWidth='sm'
                className='order'
                sx={{ background: '#fff', border: '1px solid #666', p: 5 }}>
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
                      <Status status={order?.status} />
                    </Grid>
                  </Grid>
          
                  <Grid item sx={{ pb: 2 }}>
                    <Shipping address={order?.address} name={order?.name} />
                  </Grid>
          
                  <Grid item container flexDirection='column' spacing={2}>
                    {order?.selected_items?.map((item) => (
                      <ProductOrder item={item} key={`order-item-${item.id}`} />
                    ))}
                  </Grid>
          
                  <Grid item alignSelf='flex-end'>
                    <Typography>
                      <strong>Total: ${parseInt(order?.amount)}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
                : */}
                {<CircularProgress color='inherit'/>} 
              </Grid>

              <Grid item textAlign='center'>
                <Button
                  onClick={() => navigate('/')}
                  variant='contained'
                  className='btn btn-lg'
                  color='info'>
                  Continue Shopping
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>
  )
}

export default Checkout