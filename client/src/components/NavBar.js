import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from './UserProvider';
import CartNav from './CartNav';

function NavBar({cart}){
  const {user, setUser, isAdmin, setIsAdmin} = useContext(UserContext);
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();

  function handleLogout(){
    fetch("/logout", {
      method: "DELETE"
    })
    .then((r) => {
      if (r.ok){
        setUser(null);
        setIsAdmin(false);
        navigate('/');
      }
    });
  };
  
  return(
    <div className='navDiv'> 
      <ul>
        <li className='appTitle'><NavLink className='appNavTitle' to="/home">JACafe</NavLink></li>
        <li className='dropDownList'>{!user ? <NavLink to='/login'>Login/Sign-Up</NavLink>: <NavLink onClick={handleLogout} to='/login' className='dropDownItems'>Logout</NavLink>}</li>
        <li>{isAdmin ? <NavLink to="/dashboard">Admin Dashboard</NavLink> : <CartNav cart={cart}/>}</li>
      </ul>
    </div>
  )
}

export default NavBar