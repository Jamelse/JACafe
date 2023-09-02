import React, {useState, useEffect} from "react";
import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import CircularProgress from '@mui/material/CircularProgress';
import OrderStatus from "./OrderStatus";

function AdOrd(){
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    fetch('/orders')
    .then(r => r.json())
    .then(order => setOrders(order))
  }, []);

  function handleSetOrderStatus(newOrder){
    setOrders(orders.map(
      order => order.id === newOrder.id ? newOrder : order))
  };

  const columns = [
    { field: 'id', headerName: 'Order #', width: 200 },
    { field: 'date', headerName: 'Order Placed On', width: 200 },
    { field: 'total', headerName: 'Total', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 300,
      renderCell: (params) => <OrderStatus order={params.row} handleSetOrderStatus={handleSetOrderStatus}/>,
    },
  ]
  if (!orders) return <CircularProgress color='inherit'/>
  return (
  <Grid item container flexDirection='column' wrap='nowrap' spacing={3}>
    <Grid
      item
      container
      sx={{ height: '100%', width: '100%', minHeight: 600 }}
      xs={12}>
      <Grid item flexGrow={1}>
        <DataGrid rows={orders} columns={columns} />
      </Grid>
    </Grid>
  </Grid>
  )
}

export default AdOrd