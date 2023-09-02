import React, { useState, useEffect }from "react";
import { TextField, Grid, Button, Typography, Select, MenuItem, FormControl, InputLabel, Paper, Box} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditCoffeeForm({ handleSetCoffees, handleSetCoffeeDetail }){
  const {id} = useParams();
  const navigate = useNavigate();
  const [coffeeInfo, setCoffeeInfo] = useState(null);
  const [coffeeDetails, setCoffeeDetails] = useState(null);
  const [active, setActive] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    fetch(`/coffees/${id}`)
    .then(r => r.json())
    .then(coffee => {
      setCoffeeInfo(coffee)
      setCoffeeDetails(coffee.coffee_detail)})
  }, []);

  function handleChange(e) {
    const key = e.target.name
    setCoffeeInfo({
      ...coffeeInfo,
      [key]: e.target.value
    });
  };

  function handleCoffeeDetailChange(e){
    const key = e.target.name
     setCoffeeDetails({
       ...coffeeDetails,
       [key]: e.target.value
     })
   };

  function handleEditCoffeeSubmit(e){
    e.preventDefault();
    setErrors(null);
    fetch(`/coffees/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coffeeInfo),
    })
    .then((r) => {
      if (r.ok){
        r.json()
        .then(updatedCoffee => {
          handleSetCoffees(updatedCoffee)
          coffeeDetails ? setActive(false) : navigate("/dashboard/products")})
      } else {
        r.json()
        .then((err) => setErrors(err.errors));
      }
    });
  };
  
  console.log(errors)
  function handleEditCoffeeDetailSubmit(e){
    e.preventDefault();
    setErrors(null);
    fetch(`/coffee_details/${coffeeInfo.coffee_detail.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coffeeDetails),
    })
    .then((r) => {
      if (r.ok){
        r.json()
        .then(updatedDetail => {
          handleSetCoffeeDetail(updatedDetail)
          navigate("/dashboard/products")})
      } else {
        r.json()
        .then((err) => setErrors(err.errors));
      }
    });
  };

  function errorHandle(name){
    const newError = errors?.filter(error => error.toLowerCase().includes(name) ? error : null)
      
    return newError
  };

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square justifyContent='center'>
        {!coffeeInfo ? <CircularProgress color='inherit'/> : 
          <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Grid item container flexDirection='column' spacing={2} alignItems='center'>
            <Grid item>
              <Typography component='h1' variant='h5' align='center' paddingTop>
                {active ? 'Coffee Summary' : 'Coffee Detail Summary'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <img src={coffeeInfo.image} alt={coffeeInfo.name} className='coffeeDetailImg' />
            </Grid>
          </Grid>
          {active ? 
          <Box component="form" noValidate  onSubmit={handleEditCoffeeSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <TextField
                error={Boolean(errorHandle("name"))} 
                helperText={errorHandle("name")}
                value={coffeeInfo.name}
                onChange={handleChange}
                margin="normal"
                name="name"
                label='Coffee Name'
                variant='outlined'
                color='info'
                fullWidth/>

              <TextField
                error={Boolean(errorHandle("image"))} 
                helperText={errorHandle("image")}
                value={coffeeInfo.image}
                onChange={handleChange}
                margin="normal"
                name="image"
                label='Image URL'
                variant='outlined'
                color='info'
                fullWidth/>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={Boolean(errorHandle("calories"))} 
                    helperText={errorHandle("calories")}
                    value={coffeeInfo.calories}
                    onChange={handleChange}
                    margin="normal"
                    name="calories"
                    label='Calories'
                    variant='outlined'
                    color='info'
                    fullWidth/>
                </Grid> 
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={Boolean(errorHandle("price"))} 
                    helperText={errorHandle("price")}
                    value={coffeeInfo.price}
                    onChange={handleChange}
                    margin="normal"
                    name="price"
                    label='Price'
                    variant='outlined'
                    color='info'
                    fullWidth/>
                </Grid>
              </Grid>
              <TextField
                error={Boolean(errorHandle("description"))} 
                helperText={errorHandle("description")}
                value={coffeeInfo.description}
                onChange={handleChange}
                margin="normal"
                name="description"
                label='Description'
                variant='outlined'
                color='info'
                fullWidth
                multiline
                rows={5}/>
              <Grid item container spacing={2}xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Hot or Cold</InputLabel>
                    <Select name="hot" onChange={handleChange} value={coffeeInfo.hot}>
                      <MenuItem value={Boolean(true)}>Hot</MenuItem>
                      <MenuItem value={Boolean(false)}>Cold</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#b47a43',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#A56F3D',
                    color: '#F0F3F4',
                }}}>
                  Save
              </Button>
            </Grid>
          </Box>
          : 
          <Box component="form" noValidate  onSubmit={handleEditCoffeeDetailSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Espresso Shots</InputLabel>
                      <Select name="espresso_shots" onChange={handleCoffeeDetailChange} value={coffeeDetails.espresso_shots}>
                        <MenuItem value='0'>0</MenuItem>
                        <MenuItem value='1'>1</MenuItem>
                        <MenuItem value='2'>2</MenuItem>
                        <MenuItem value='3'>3</MenuItem>
                        <MenuItem value='4'>4</MenuItem>
                        <MenuItem value='5'>5</MenuItem>
                      </Select>
                  </FormControl>
                </Grid> 
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                      <InputLabel>Milk</InputLabel>
                        <Select name="milk" onChange={handleCoffeeDetailChange} value={coffeeDetails.milk}>
                          <MenuItem value="No">None</MenuItem>
                          <MenuItem value='2%'>2% Milk</MenuItem>
                          <MenuItem value='Fat-free'>Fat-free Milk</MenuItem>
                          <MenuItem value='Whole'>Whole Milk</MenuItem>
                          <MenuItem value='Almond'>Almond Milk</MenuItem>
                          <MenuItem value='Oat'>Oat Milk</MenuItem>
                          <MenuItem value='Soy'>Soy Milk</MenuItem>
                          <MenuItem value='Coconut'>Coconut Milk</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
              </Grid>
              <TextField
                error={Boolean(errorHandle("syrup"))} 
                helperText={errorHandle("syrup")}
                value={coffeeDetails.syrup}
                onChange={handleCoffeeDetailChange}
                margin="normal"
                name="syrup"
                label='Syrup'
                variant='outlined'
                color='info'
                fullWidth
                rows={5}/>
              <Grid item container spacing={2}xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Syrup Pumps</InputLabel>
                    <Select name="syrup_pumps" onChange={handleCoffeeDetailChange} value={coffeeDetails.syrup_pumps}>
                      <MenuItem value='0'>0</MenuItem>
                      <MenuItem value='1'>1</MenuItem>
                      <MenuItem value='2'>2</MenuItem>
                      <MenuItem value='3'>3</MenuItem>
                      <MenuItem value='4'>4</MenuItem>
                      <MenuItem value='5'>5</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#b47a43',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#A56F3D',
                    color: '#F0F3F4',
                }}}>
                  Save
              </Button>
            </Grid>
          </Box>}
        </Box>}
      </Grid>
    </Grid>
  )
}

export default EditCoffeeForm