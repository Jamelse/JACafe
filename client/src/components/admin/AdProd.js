import React from "react"
import { Grid, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import ProdButtons from "./ProdButtons"
import { useNavigate } from "react-router-dom";

function AdProd({coffees, onDeletedCoffee}){
  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'Product #', width: 200 },
    { field: 'name', headerName: 'Product', width: 250 },
    {
      field: 'actions',
      headerName: 'Action',
      width: 300,
      renderCell: (params) => <ProdButtons coffee={params.row} onDeletedCoffee={onDeletedCoffee} />,
    },
  ]

  return (
      <Grid item container flexDirection='column' wrap='nowrap' spacing={3}>
        <Grid item textAlign='right' xs={12}>
          <Button
          variant='contained'
          sx={{ backgroundColor: '#B79163',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#fff',
            color: '#B79163',
          },}}
          onClick={() => navigate('/coffees/new')}>
          Add A Product
          </Button>
        </Grid>
        <Grid
        item
        container
        sx={{ height: '100%', width: '100%', minHeight: 600 }}
        xs={12}>
          <Grid item flexGrow={1}>
            <DataGrid rows={coffees} columns={columns} />
        </Grid>
      </Grid>        
    </Grid>
  )
}

export default AdProd