import React, {useState} from "react";
import { Menu, MenuItem, Button } from '@mui/material'
import { useNavigate } from "react-router-dom";

function NavMenu(){
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button sx={{ color: 'text.primary'}}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
          Menu
      </Button>
      <Menu
        id="basic-menu"
        disableScrollLock={true}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',}}>
        <MenuItem onClick={() => {
          handleClose();
          navigate('/menu/hot-coffees')
        }}>Hot Coffees</MenuItem>
        <MenuItem onClick={() => {
          handleClose();
          navigate('/menu/cold-coffees')
        }}>Cold Coffees</MenuItem>
      </Menu>
      </>
  )
}

export default NavMenu