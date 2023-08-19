import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from './UserProvider';

function NavBar(){
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
        <li>{isAdmin ? <NavLink to="/dashboard">Admin Dashboard</NavLink> : <button>Cart</button>}</li>
        <li>
          <p className="navUserName" onClick={() => setDropDown(!dropDown)}>{ !dropDown ? <span>&#x25BE;</span> : <span>&#x25b4;</span>}</p>
          { dropDown ? <ul className="dropdown">
            <li className='dropDownList'>{!user ? <NavLink to='/login'>Login/Sign-Up</NavLink>: <NavLink onClick={handleLogout} to='/login' className='dropDownItems'>Logout</NavLink>}</li>
          </ul> : null}
        </li>
      </ul>
    </div>
  )
}

export default NavBar