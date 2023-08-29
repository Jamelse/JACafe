import React, {useState} from 'react';
import { Button, Avatar, TextField, Link, Paper, Box, Grid, Typography, CssBaseline} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import loginDefault from '../images/loginDefault.jpg'
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';


function LoginSignUpPage(){
  const [hasAccount, setHasAccount] = useState(true);
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container sx={{ height: '100vh', pt: '0 !important', flexGrow: '0 !important'  }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${loginDefault})`,
            backgroundRepeat: 'no-repeat',
            width: "100%",
            height: "100%",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}/>
        {hasAccount ? <LoginForm setHasAccount={setHasAccount}/> : <SignUpForm setHasAccount={setHasAccount}/>}
      </Grid>
    </ThemeProvider>
  );
};

export default LoginSignUpPage