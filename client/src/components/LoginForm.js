import React, { useState, useContext } from 'react'
import { Button, Avatar, TextField, Paper, Box, Grid, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserProvider';

function LoginForm({ setHasAccount }){
  const {setUser, setIsAdmin} = useContext(UserContext);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function handleChange(e) {
    const key = e.target.name
    setLoginData({
      ...loginData,
      [key]: e.target.value
    });
  };

  function handleSubmit(e){
    e.preventDefault();
    setErrors([]);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => {
          setUser(user);
          setIsAdmin(user.isAdmin);
          user.isAdmin ? navigate('/dashboard/products') : navigate(-1)
          });
      } else {
        r.json()
        .then((err) => setErrors(err.errors))
      }
    });
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
              Sign in
            </Typography>
            <Box component="form" noValidate  onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                autoFocus
                value={loginData.email} 
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={loginData.password} 
                onChange={handleChange}
              />
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Typography onClick={() => setHasAccount(false)} variant="body2" sx={{color: 'black', textDecoration: 'none', '&:hover': {textDecoration: 'underline', cursor: 'pointer'}}}>
                    {"Don't have an account? Sign Up"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
  );
}

export default LoginForm