import React, { useState, useEffect, useContext }from "react";
import { CartContext } from "./CartProvider";
import { Typography, Grid, Button,Container, Chip } from '@mui/material'
import Divider from '@mui/material/Divider';
import { useParams } from "react-router-dom";

function CoffeeDetailPage(){
  const {cart, setCart, setCartOpen} = useContext(CartContext);
  const {id} = useParams();
  const [coffeeInfo, setCoffeeInfo] = useState(null);

  useEffect(() => {
    fetch(`/coffees/${id}`)
    .then(r => r.json())
    .then(coffee => setCoffeeInfo(coffee))
  }, []);

  

 function handleAddToCart(){
    fetch(`/carts/${cart.id}`, {
      method: "PATCH",
      headers: {
       "Content-Type": "application/json",
      },
     body: JSON.stringify({
        coffee_id: coffeeInfo.id,
        quantity: 1
      }),
    })
    .then((r) => {
      if (r.ok){
        r.json()
        .then(updatedCart => {
          setCart(updatedCart)
          setCartOpen(true)})
      } else {
        r.json()
        .then((err) => console.log(err.errors));
      }
   });
  }
 
  return (
    <>
    <Button
        onClick={handleAddToCart}
        variant='contained'
        className='btn btn-lg btn-checkout'
        color='info'
        sx={{ 
          backgroundColor: '#b47a43',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#A56F3D',
            color: '#F0F3F4',},}}>
        Add To Cart
      </Button>
    {coffeeInfo ?
      <>
        <Grid item container sx={{ color: 'white', backgroundColor: '#363738', alignItems: 'center', display: 'flex'}}>
          <Container>
            <Grid item container>
              <Grid item sx={{marginRight: '88px', marginLeft:"0px"}} pt={3} pb={3}>
                <img src={coffeeInfo.image} alt={coffeeInfo.name} className="coffeeDetailImg"/>
              </Grid> 
              <Grid item sx={{marginLeft: '88px', marginRight:"0px"}} pt={3} pb={3}>
                <Typography variant='h2' className="coffeeDetailName">{coffeeInfo.name}</Typography>
                <Typography variant='h4' gutterBottom className="coffeeDetailCalories">{coffeeInfo.calories} calories</Typography>
                <Divider color='#EEEEE'/>
                <Typography variant='h4' className="coffeeDetailPrice">$ {coffeeInfo.price}</Typography>
              </Grid> 
            </Grid>
          </Container>
        </Grid>
        <Grid item container sx={{alignItems: 'center', display: 'flex'}}>
          <Container>
            <Grid item container pt={5}>
              <Grid item sx={{marginRight: '88px', marginLeft:"0px", maxWidth:"420px"}}>
                <Typography variant='h4' gutterBottom>Description</Typography>
                <Divider />
                <br />
                <Typography variant="h6">{coffeeInfo.description}</Typography>
              </Grid>
              {!!coffeeInfo.coffee_detail &&
              <Grid item sx={{marginLeft: '88px', marginRight:"0px", maxWidth:"420px"}}>
              <Typography variant='h4' gutterBottom>What's Included</Typography>
                <Divider />
                <br />
                <Divider><Chip sx={{backgroundColor: '#b47a43'}} label="Espresso"/></Divider>
                <Typography variant="h6" textAlign={'center'}>{coffeeInfo.coffee_detail.espresso_shots} shots</Typography>
                <br />
                {!!coffeeInfo.coffee_detail.milk && 
                <>
                  <Divider><Chip sx={{backgroundColor: '#d8f4ff'}} label="Milk"/></Divider>
                  <Typography variant="h6" textAlign={'center'}>{coffeeInfo.coffee_detail.milk} Milk</Typography>
                  <br />
                </>}
                {!!coffeeInfo.coffee_detail.syrup_pumps &&
                <>
                  <Divider><Chip sx={{backgroundColor: '#b18867'}} label="Syrup"/></Divider>
                  <Typography variant="h6" textAlign={'center'}>{coffeeInfo.coffee_detail.syrup_pumps} pumps of {coffeeInfo.coffee_detail.syrup}</Typography>
                </> }
                
              </Grid> } 
            </Grid>
          </Container>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='h5' component='p' className='coffeeDetailPrice'></Typography>
        </Grid> </>
      :<h1>Loading..</h1>}
    </>
  )
}

export default CoffeeDetailPage