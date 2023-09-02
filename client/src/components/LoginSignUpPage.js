import React, {useState} from 'react';
import {Grid} from '@mui/material'
import loginDefault from '../images/loginDefault.jpg'
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';


function LoginSignUpPage(){
  const [hasAccount, setHasAccount] = useState(true);
  
  return (
      <Grid container sx={{ height: '100vh', pt: '0 !important', flexGrow: '0 !important'  }}>
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
  );
};

export default LoginSignUpPage