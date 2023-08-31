import React, {useContext} from "react";
import { CartContext } from "./CartProvider";
import { UserContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";
import { IconButton, Grid, Typography, Card, CardMedia, CardContent, Select, MenuItem, Button, imageListClasses} from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Divider from '@mui/material/Divider';

function Cart(){
  const {cart, setCart} = useContext(CartContext);
  const {user, isAdmin} = useContext(UserContext);
  const navigate = useNavigate();

  function handleChange(e) {
    fetch(`/carts/${e.target.name}/new_quantity`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: e.target.value
      }),
    })
    .then(r => r.json())
    .then(updatedCart => setCart(updatedCart))
  };

  function handleCartDelete(id){
    fetch(`/carts/${id}/delete_item`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      }, 
    })
    .then(r => r.json())
    .then(updatedCart => setCart(updatedCart))
  };

  function handleCartCheckout(){
    const cart_itemIds = cart?.cart_items.map(item => item.id);
    fetch('/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cart_itemIds,
      })
    })
    .then(r => r.json())
    .then(url => window.location = url.url)
  }
  console.log(cart)
  if (!cart) return <h1>Loading...</h1>
  return (
    <>
    <Grid container className="cartItemContainer" justifyContent="center" alignItems="center" sx={{backgroundColor: "#363738" , color: 'white'}}>
              <Grid item textAlign="center" >
                <Typography variant="h4">Subtotal</Typography>
                <h3>{`(${cart.cart_items.map(item => item.quantity).reduce((a, b)=> a + b, 0)} items)`}</h3>
                <h2>${cart.cart_total}</h2>
                {!!cart.cart_items.length > 0 && <Button variant='contained'
                  color='info'
                  sx={{ backgroundColor: '#b47a43',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#A56F3D',
                      color: '#F0F3F4',},}}
                      onClick={() => !!user && !isAdmin ? handleCartCheckout() : navigate('/login')}>Proceed to checkout</Button>}
              </Grid>
            </Grid>
      { cart.cart_items.length > 0 ? cart.cart_items.map((item) => (
        <Grid item container key={item.id}  lg={2}  className="cartItemContainer">
          <Card className='cartNavCart'sx={{ width: 300, height: 300, backgroundColor: '#b47a43', color: 'white' }} >
                <CardMedia
                  className="cartCardImg"
                  component="img"
                  alt={item.item_summary.name}
                  image={item.item_summary.image}/>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.item_summary.name}
                  </Typography>
                  <h3>$ {item.item_price}</h3>
                  <Select value={item.quantity} onChange={handleChange} autoWidth name={item.id} sx={{color: 'white'}}>  
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={5}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                  <IconButton aria-label="delete" size="large" onClick={() => handleCartDelete(item.id)}>
                    <DeleteOutlinedIcon sx={{ color: 'white' }} fontSize="inherit" />
                  </IconButton>
                </CardContent>
            </Card>
          </Grid>
          )): <h1>Your Cart is empty</h1>}
          
      </>
    )
};

export default Cart