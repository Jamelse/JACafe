import React, {useContext, useState} from "react";
import { UserContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, IconButton, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';

function NavUserMenu({handleLogout}){
  const {user, isAdmin} = useContext(UserContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
    <>
      {isAdmin ?
      <>
        <IconButton
        edge='start'
        color='inherit'
        aria-controls={open ? 'admin-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
          <PersonIcon/>
          <Typography>Admin</Typography>
        </IconButton>
        <Menu
          id="admin-menu"
          disableScrollLock={true}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',}}>
          <MenuItem onClick={() => {
            handleClose()
            navigate('/dashboard/products')}}>Products Dashboard</MenuItem>
          <MenuItem onClick={() => {
            handleClose()
            navigate('/dashboard/orders')}}>Orders Dashboard</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>
      : 
      <>
        <IconButton
        edge='start'
        color='inherit'
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
          <PersonIcon/>
          <Typography>{user?.first_name}</Typography>
        </IconButton>
        <Menu
          id="user-menu"
          disableScrollLock={true}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',}}>
          <MenuItem onClick={() => {
            handleClose()
            navigate(`/user/${user.id}/orders`)}}>My Orders</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>}
    </>
  )
}

export default NavUserMenu