import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserProvider';

function SignUpForm(){
  const {setUser} = useContext(UserContext);
  const [signUpData, setSignUpData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState([]);
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
    setErrors([]);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    }).then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => {setUser(user)
          navigate("/")});
      } else {
        r.json()
        .then((err) => setErrors(err.errors));
      }
    });
  };
    
  return (
    <div className='loginSignUpContainer'>
      <div className="errorsDiv">
      {errors.map(error => {
        return (
         <p className="errorMessage" key={error}><span className="material-icons">priority_high</span>{error}</p>
        )
      })}
    </div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email: <input className="loginSignUpInput" type="email"  name="email" value={signUpData.email} onChange={handleChange} autoComplete="off"/></label>  
      </div>
      <div>
        <label>Password: <input className="loginSignUpInput" type="password" name="password" value={signUpData.password} onChange={handleChange} /></label>    
      </div>
      <div>
        <label>Confirm Password: <input className="loginSignUpInput" type="password" name="password_confirmation" value={signUpData.password_confirmation} onChange={handleChange} /></label>
      </div>
      <div>
        <label>First Name: <input className="loginSignUpInput" type="text" name="first_name" value={signUpData.first_name} onChange={handleChange} autoComplete="off"/></label>     
      </div>
      <div>
        <label>Last Name: <input className="loginSignUpInput" type="text" name="last_name" value={signUpData.last_name} onChange={handleChange} /></label> 
      </div>
      <button type="submit">Sign Up</button>
    </form>
    </div>
  );
};

export default SignUpForm;