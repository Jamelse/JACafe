import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { MenuList, MenuItem, Paper } from '@mui/material'

function AdNav(){
  const location = useLocation();
  const navigate = useNavigate();
  return(
    <Paper
      sx={{ p: 4, backgroundColor: '#B79163', height: 'fill' }}
      elevation={0}>
        <MenuList className='side-menu'>
          <MenuItem
            className={
              location.pathname === '/dashboard/products' ? 'active' : null } 
              onClick={() => navigate('/dashboard/products')}>
            <Link to='/dashboard/products'>Products</Link>
          </MenuItem>
          <MenuItem
            className={
              location.pathname === '/dashboard/orders' ? 'active' : null }
              onClick={() => navigate('/dashboard/orders')}>
            <Link to='/dashboard/orders'>Orders</Link>
          </MenuItem>
        </MenuList>
    </Paper>
    
  )
}

export default AdNav