import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, IconButton } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

function NavLogin(){
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
        <IconButton
        edge='start'
        color='inherit'
        aria-controls={open ? 'login-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
          <PersonOutlineIcon/>
        </IconButton>
        <Menu
          id="login-menu"
          disableScrollLock={true}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',}}>
          <MenuItem onClick={() => {
          handleClose()
          navigate('/login')}}>Login / SignUp</MenuItem>
        </Menu>
      </>
  )
}

export default NavLogin