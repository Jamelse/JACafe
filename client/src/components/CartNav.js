import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Badge, Grid, Typography, Drawer, Card, CardMedia, CardContent, Select, MenuItem, Button} from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Divider from '@mui/material/Divider';

function CartNav({cart, setCart}){
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
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
             aria-controls={open ? 'basic-menu' : undefined}
             aria-haspopup="true"
             aria-expanded={open ? 'true' : undefined}
             onClick={() => setDropDown(true)}>
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
          <Drawer anchor="right" disableScrollLock={true} open={dropDown} onClose={() => setDropDown(false)}>
            <Grid container className="cartItemContainer" justifyContent="center" alignItems="center">
              <Grid item textAlign="center">
                <Typography variant="h4">Subtotal</Typography>
                <h2>${cart.cart_total}</h2>
                <Button variant="outlined" color="inherit" onClick={() => { setDropDown(false)
                  navigate('/cart')}}>Go to Cart</Button>
              </Grid>
            </Grid>
      {cart.cart_items.length === 0 ? 
            <Grid item>
              <Typography variant="h2">No items in your cart.</Typography>
            </Grid> : null}
      {cart.cart_items.map((item) => (
        <Grid item >
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
          </Drawer>
        </>
    // <div className="cartPreviewDiv">
    //   <p onClick={() => setDropDown(!dropDown)}>Cart{cart && cart.cart_items ? 
    //   cart.cart_items.map(item => item.quantity).reduce((a, b)=> a + b, 0) : 0}{ !dropDown ? <span>&#x25BE;</span> : <span>&#x25b4;</span>}</p>
    //       { dropDown ? 
    //       <ul className="dropdown">
    //         <li><h3>Subtotal</h3></li>
    //         <li>${cart.cart_total}</li>
    //         <button onClick={() => {navigate('/cart')
    //           setDropDown(false)}}>Go to Cart</button>
    //         {cart && cart.cart_items ? cart.cart_items.map(item => {
    //           return (
    //             <div className="cartItemDiv" key={item.id}>
    //               <li>
    //                 <img className="cartItemImg" src={item.item_summary.image}/>
    //                 <p>{item.item_summary.name}</p>
    //                 <p>${item.item_price}</p>
    //                 <select 
    //                   name={item.id}
    //                   onChange={handleChange}
    //                   value={item.quantity}>
    //                   <option value='1'>1</option>
    //                   <option value='2'>2</option>
    //                   <option value='3'>3</option>
    //                   <option value='4'>4</option>
    //                   <option value='5'>5</option>
    //                 </select>  
    //                 <button onClick={() => navCartDelete(item.id)}>Delete</button>
    //               </li>
    //             </div>
    //           )
    //         }) : <li>Cart is empty!</li>}
    //       </ul> : null}
    // </div>
  )
}

export default CartNav