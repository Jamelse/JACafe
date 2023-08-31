import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { TextField, Grid, Button, Typography, Select, MenuItem, FormControl, InputLabel, Paper, Box} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import newCoffeeImg from '../images/newCoffeeImg.jpg'

function NewCoffeeForm({ handleSetCoffees, handleSetCoffeeDetail}){
  const navigate = useNavigate();
  const [active, setActive] = useState(true);
  const [coffeeInfo, setCoffeeInfo] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    calories: '',
    hot: true
  });
  const [coffeeDetails, setCoffeeDetails] = useState({
    coffee_id: '',
    espresso_shots: '0',
    milk: '',
    syrup: '',
    syrup_pumps: '0'
  });
  const [errors, setErrors] = useState([]);

  function handleCoffeeChange(e) {
    const key = e.target.name
    setCoffeeInfo({
      ...coffeeInfo,
      [key]: e.target.value
    })
  };

  function handleCoffeeDetailChange(e){
   const key = e.target.name
    setCoffeeDetails({
      ...coffeeDetails,
      [key]: e.target.value
    })
  }

  function handleCoffeeSubmit(e){
    e.preventDefault();
    setErrors([]);
    fetch("/coffees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...coffeeInfo,
        calories: Number(coffeeInfo.calories),
        price: Number(coffeeInfo.price)
      }),
    })
    .then((r) => {
      if (r.ok){
        r.json()
        .then((coffee) => { 
          handleSetCoffees(coffee)
          setCoffeeDetails({
            ...coffeeDetails,
            coffee_id: coffee.id
          })
          setActive(false)})
      } else {
        r.json()
        .then((err) => setErrors(err.errors));
      }
    })
  }

  function handleCoffeeDetailSubmit(e){
    e.preventDefault();
    setErrors([]);
    fetch("/coffee_details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coffeeDetails),
    })
    .then((r) => {
      if (r.ok){
        r.json()
        .then((coffee_detail) => { 
          handleSetCoffeeDetail(coffee_detail)
          setActive(true)
          navigate('/dashboard/products')})
      } else {
        r.json()
        .then((err) => setErrors(err.errors));
      }
    })
  }

  return (

    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square justifyContent='center'>
          <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Grid item container flexDirection='column' spacing={2} alignItems='center'>
            <Grid item>
              <Typography component='h1' variant='h5' align='center' paddingTop>
                {active ? 'New Coffee' : 'New Coffee Detail'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <img src={newCoffeeImg} alt='? Coffee' className='coffeeDetailImg' />
            </Grid>
          </Grid>
          {active ? 
          <Box component="form" noValidate  onSubmit={handleCoffeeSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <TextField
                value={coffeeInfo.name}
                onChange={handleCoffeeChange}
                margin="normal"
                name="name"
                label='Coffee Name'
                variant='outlined'
                color='info'
                fullWidth/>

              <TextField
                value={coffeeInfo.image}
                onChange={handleCoffeeChange}
                margin="normal"
                name="image"
                label='Image URL'
                variant='outlined'
                color='info'
                fullWidth/>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={coffeeInfo.calories}
                    onChange={handleCoffeeChange}
                    margin="normal"
                    name="calories"
                    label='Calories'
                    variant='outlined'
                    color='info'
                    fullWidth/>
                </Grid> 
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={coffeeInfo.price}
                    onChange={handleCoffeeChange}
                    margin="normal"
                    name="price"
                    label='Price'
                    variant='outlined'
                    color='info'
                    fullWidth/>
                </Grid>
              </Grid>
              <TextField
                value={coffeeInfo.description}
                onChange={handleCoffeeChange}
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
                    <Select name="hot" onChange={handleCoffeeChange} value={coffeeInfo.hot}>
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
                  Create
              </Button>
            </Grid>
          </Box>
          : 
          <Box component="form" noValidate  onSubmit={handleCoffeeDetailSubmit} sx={{ mt: 1 }}>
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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
                      Create
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    onClick={() => navigate(-1)}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: '#E74C3C',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#B03A2E',
                        color: '#F0F3F4',
                    }}}>
                      No Detail
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>}
        </Box>
      </Grid>
    </Grid>
    // <div>
    //   {!coffeeCreated ? 
    //   <div>
    //     <form className="editForm" onSubmit={handleCoffeeSubmit}>
    //   <div>
    //     <label>Name: <input className="formInput" type="text"  name="name"  autoComplete="off" value={coffeeInfo.name} onChange={handleCoffeeChange}/></label>  
    //   </div>
    //   <div>
    //     <label>Description: <input className="formInput" type="text"  name="description"  value={coffeeInfo.description} onChange={handleCoffeeChange}/></label>      
    //   </div>
    //   <div>
    //     <label>Image: <input className="formInput" type="text"  name="image"  value={coffeeInfo.image} onChange={handleCoffeeChange}/></label> 
    //   </div>
    //   <div>
    //     <label>Price: <input className="formInput" type="text"  name="price"  value={coffeeInfo.price} onChange={handleCoffeeChange}/></label> 
    //   </div>
    //   <div>
    //     <label>Calories: <input className="formInput" type="text"  name="calories"  value={Number(coffeeInfo.calories)} onChange={handleCoffeeChange}/></label> 
    //   </div>
    //   <div>
    //     <label>Hot or Cold:
    //       <select 
    //         onChange={handleCoffeeChange}
    //         value={coffeeInfo.hot} 
    //         name="hot">
    //           <option value={Boolean(true)}>Hot</option>
    //           <option value={Boolean(false)}>Cold</option>
    //       </select> 
    //     </label>
    //   </div>
    //   <button type="submit">Create Coffee</button>
    //   </form>
    //   <button className="cancelButton" onClick={() => navigate(-1)}>Cancel</button>
    //   </div> 
    //   : 
    //   <div>
    //     <form className="editForm" onSubmit={handleCoffeeDetailSubmit}>
    //   <div>
    //     <label>Espresso Shots:
    //       <select 
    //         onChange={handleCoffeeDetailChange}
    //         value={coffeeDetails.espresso_shots} 
    //         name="espresso_shots">
    //           <option value='0'>0</option>
    //           <option value='1'>1</option>
    //           <option value='2'>2</option>
    //           <option value='3'>3</option>
    //           <option value='4'>4</option>
    //           <option value='5'>5</option>
    //       </select> 
    //     </label>
    //   </div>
    //   <div>
    //     <label>Milk:
    //       <select 
    //         onChange={handleCoffeeDetailChange}
    //         value={coffeeDetails.milk} 
    //         name="milk">
    //           <option value='No'>None</option>
    //           <option value='2%'>2% Milk</option>
    //           <option value='Fat-free'>Fat-free Milk</option>
    //           <option value='Whole'>Whole Milk</option>
    //           <option value='Almond'>Almond Milk</option>
    //           <option value='Oat'>Oat Milk</option>
    //           <option value='Soy'>Soy Milk</option>
    //           <option value='Coconut'>Coconut Milk</option>
    //       </select>
    //     </label>      
    //   </div>
    //   <div>
    //     <label>Syrup: <input className="formInput" type="text"  name="syrup"  value={coffeeDetails.syrup} onChange={handleCoffeeDetailChange}/></label>      
    //   </div>
    //   <div>
    //     <label>Syrup Pumps:
    //       <select 
    //         onChange={handleCoffeeDetailChange}
    //         value={coffeeDetails.syrup_pumps} 
    //         name="syrup_pumps">
    //           <option value='0'>0</option>
    //           <option value='1'>1</option>
    //           <option value='2'>2</option>
    //           <option value='3'>3</option>
    //           <option value='4'>4</option>
    //           <option value='5'>5</option>
    //       </select> 
    //     </label> 
    //   </div>
    //   <button type="submit">Create Details</button>
    //   </form>
    //   <button className="noDetailButton" onClick={() => {
    //     setCoffeeCreated(false)
    //     navigate('/dashboard/products')}}>No Details</button>
    //   </div>}
    // </div>
  )
}

export default NewCoffeeForm