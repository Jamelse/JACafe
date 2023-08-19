import React from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';


function LoginSignUpPage(){
  return (
    <div>
      <div>
        <LoginForm />
      </div>
      <div>
        <SignUpForm />
      </div>
    </div>
  );
};

export default LoginSignUpPage