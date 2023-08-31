import React, {useState, useEffect, useContext} from "react";
import { UserContext} from "./UserProvider";
import { Grid, Typography } from '@mui/material'
import OrderDetails from "./OrderDetails";

function UserOrders(){
  const {user} = useContext(UserContext);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    fetch(`/user/${user?.id}/orders`)
    .then(r => r.json())
    .then(ord => setOrders(ord))
  }, []);


  console.log(orders)
  return (
    <Grid container justifyContent="center" pb={10}>
      <Grid item>
        <Typography component='h1' variant='h4' align='center' paddingTop>Your Orders</Typography>
      </Grid>
      <Grid container flexDirection='column' sx={{ pt: 3 }}>
        {orders?.length === 0 && (
          <Grid item>
          <Typography variant='subtitle1' align='center'>
            No Orders
          </Typography>
        </Grid>)}
        <Grid item container spacing={4} flexDirection='column'>
          {orders?.map(order => {
            return (
              <Grid item key={order.id}>
                <OrderDetails order={order}/>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UserOrders