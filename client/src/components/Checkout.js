import React, {useEffect, useState, useContext} from "react";
import { UserContext } from "./UserProvider";
import { CartContext } from "./CartProvider";
import { Grid, Typography, Container, Button } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from "react-router-dom";
import OrderDetails from "./OrderDetails";

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
      setUser({...user})
      setCart({...cart, cart_total: 0, cart_items: []})
    })
  }
  const time = new Date()
  
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
            <Typography variant='h2' component='h1'>Thank you for your order</Typography>
          </Grid>
          <Grid item textAlign='center'>
            <Typography variant='h3' component='h2'>Estimated Pickup: {time.getHours()}:{time.getMinutes() + 15}</Typography>
          </Grid>
            <OrderDetails order={order}/>
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