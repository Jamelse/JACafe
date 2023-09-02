import React, { useState, useContext } from 'react';
import { Button, Avatar, TextField, Paper, Box, Grid, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';

function SignUpForm({setHasAccount}){
  const {setUser, setIsAdmin} = useContext(UserContext);
  const [signUpData, setSignUpData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  
  function handleChange(e) {
    const key = e.target.name
    setSignUpData({
      ...signUpData,
      [key]: e.target.value
    });
  };


  function handleSubmit(e){
    e.preventDefault();
    setErrors(null);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    }).then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => {
          setUser(user);
          setIsAdmin(user.isAdmin)
          navigate("/")});
      } else {
        r.json()
        .then((err) => setErrors(err.errors));
      }
    });
  };

  function errorHandle(name){
    const newError = errors?.filter(error => error.toLowerCase().includes(name) ? error : null)
      
    return newError
  }
    
  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'black' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate  onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                  <TextField
                    error={Boolean(errorHandle("first"))} 
                    helperText={errorHandle("first")}
                    autoComplete="given-name"
                    name="first_name"
                    required
                    fullWidth
                    label="First Name"
                    autoFocus
                    value={signUpData.first_name} 
                    onChange={handleChange}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={Boolean(errorHandle("last"))} 
                    helperText={errorHandle("last")}
                    required
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    autoComplete="family-name"
                    value={signUpData.last_name} 
                    onChange={handleChange}/>
                </Grid>
              </Grid>
              <TextField
                error={Boolean(errorHandle("email"))} 
                helperText={errorHandle("email")}
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="off"
                value={signUpData.email} 
                onChange={handleChange}/>
              <TextField
                error={Boolean(errorHandle("password"))} 
                helperText={errorHandle("password")}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={signUpData.password} 
                onChange={handleChange}/>
                <TextField
                error={Boolean(errorHandle("password"))} 
                helperText={errorHandle("password")}
                margin="normal"
                required
                fullWidth
                name="password_confirmation"
                label="Confirm Password"
                type="password"
                autoComplete="off"
                value={signUpData.password_confirmation} 
                onChange={handleChange}/>
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
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Typography onClick={() => setHasAccount(true)} variant="body2" sx={{color: 'black', textDecoration: 'none', '&:hover': {textDecoration: 'underline', cursor: 'pointer'}}}>
                    {"Already have an account? Sign in"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
  );
};

export default SignUpForm;