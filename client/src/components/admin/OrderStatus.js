import React from 'react'
import {Grid, FormControl, Select, MenuItem} from '@mui/material'

function OrderStatus({ order, handleSetOrderStatus}){

  function handleChange(e) {
    fetch(`/orders/${order.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: e.target.value
        }),
      })
      .then(r => r.json())
      .then(updatedOrder => handleSetOrderStatus(updatedOrder))
    };

  const statusColor = order.status === 'Completed' ? 'green' : 'black'

  return (
    <>
      <Grid container alignItems='center' justifyContent='center' spacing={1}>
        <Grid item>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 200, textAlign: 'center' }}>
            <Select sx={{color: statusColor}} name='status' value={order.status} onChange={handleChange}>
              <MenuItem color="inherit" value="Processing">Processing</MenuItem>
              <MenuItem value="Completed" className='completed'>Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

export default OrderStatus
