import React from "react";
import { Grid, Button, Tooltip, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from "react-router-dom";

function ProdButtons({coffee, onDeletedCoffee}){
  const navigate = useNavigate();

  function coffeeDeleteHandler(coffee){
    fetch(`/coffees/${coffee.id}`, {
      method: 'DELETE'
    })
    .then((r) => {
      if (r.ok) {
        onDeletedCoffee(coffee)
      }
    })
  }


  return (
    <Grid container alignItems='center' justifyContent='center' spacing={1}>
    <Grid item>
      <Button
        variant='outlined'
        className='btn b-radius'
        color='info'
        onClick={() => navigate(`/coffees/${coffee.id}/edit`)}>
        Edit
      </Button>
    </Grid>
    <Grid item>
      <Tooltip title='Delete Product'>
        <IconButton
          aria-label='delete'
          color='error'
          onClick={coffeeDeleteHandler}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Grid>
  </Grid>

  )

}

export default ProdButtons