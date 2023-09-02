import React, {useContext} from "react";
import { CartContext } from '../providers/CartProvider';
import { useNavigate } from "react-router-dom";
import { IconButton, Badge, Grid, Typography, Drawer, Card, CardMedia, CardContent, Select, MenuItem, Button} from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Divider from '@mui/material/Divider';

function CartNav(){
  const {cart, setCart, cartOpen, setCartOpen} = useContext(CartContext)
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
  
  function navCartDelete(id){
    fetch(`/carts/${id}/delete_item`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      }, 
    })
    .then(r => r.json())
    .then(updatedCart => setCart(updatedCart))
  }
  
  if (!cart) return <h1>Loading</h1>

  return (
    <>
      <Grid item xs='auto'>
            <IconButton size='large' aria-label='cart' color='inherit' 
              id="basic-button"
              aria-controls={cartOpen ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={cartOpen ? 'true' : undefined}
              onClick={() => setCartOpen(true)}>
                <Badge
                  badgeContent={cart && cart.cart_items ? cart.cart_items.map(item => item.quantity).reduce((a, b)=> a + b, 0) : 0}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#b47a43',
                      color: 'white'}}}>
                  <ShoppingCartOutlinedIcon />
                </Badge>
            </IconButton>
          </Grid>
          <Drawer anchor="right" disableScrollLock={true} open={cartOpen} onClose={() => setCartOpen(false)}>
            <Grid container alignItems='flex-end' sx={{backgroundColor: '#363738', color: 'white'}}>
              <Grid item container justifyContent='flex-end'flexWrap='nowrap'>
                <Grid item>
                <IconButton size='large' aria-label='cart' color='inherit' id="basic-button"aria-haspopup="true" onClick={() => setCartOpen(false)}>
                    <Badge
                      badgeContent={cart && cart.cart_items ? cart.cart_items.map(item => item.quantity).reduce((a, b)=> a + b, 0) : 0}
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: '#b47a43',
                          color: 'white'}}}>
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid container className="cartItemContainer" justifyContent="center" alignItems="center">
              <Grid item textAlign="center">
                <Typography variant="h4">Subtotal</Typography>
                <h2>${cart.cart_total}</h2>
                <Button variant="outlined" color="inherit" onClick={() => { setCartOpen(false)
                  navigate('/cart')}}>Go to Cart</Button>
              </Grid>
            </Grid>
      {cart.cart_items.length === 0 ? 
            <Grid item>
              <Typography variant="h2">No items in your cart.</Typography>
            </Grid> : null}
            <Grid item className="cartNavItems">
            {cart.cart_items.map((item) => (
        <Grid item key={item.id}>
          <Divider sx={{ my: 0.5 }} />
          <Card className='cartNavCart'sx={{ maxWidth: 500 }} >
                <CardMedia
                  component="img"
                  alt={item.item_summary.name}
                  image={item.item_summary.image}/>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.item_summary.name}
                  </Typography>
                  <h3>$ {item.item_price}</h3>
                  <Select value={item.quantity} onChange={handleChange} autoWidth name={item.id}>  
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={5}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                  <IconButton aria-label="delete" size="large" onClick={() => navCartDelete(item.id)}>
                    <DeleteOutlinedIcon sx={{ color: '#000' }} fontSize="inherit" />
                  </IconButton>
                </CardContent>
            </Card>
          </Grid>
          ))}
        </Grid>
      </Drawer>
  </>
  )
}

export default CartNav