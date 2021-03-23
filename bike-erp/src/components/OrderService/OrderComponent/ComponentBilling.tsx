import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { BACKEND_URL } from "../../../core/utils/config";
import { Order, removeAllItem, removeItem } from "../../../redux/actions/OrderListActions/orderListAction";

import { Box, Button, Paper, Typography } from "@material-ui/core";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import useStyles from "./ComponentBillingStyle";

const ComponentBilling = ({ orderList, removeItem, removeAllItems }: any) => {
  
  const styles = useStyles();
  const url = BACKEND_URL;

  //updating the list of order in the backend
  const updateQuantityOfListOrder = () => {
    if (orderList.orderList.length > 0) {
      axios.put(`${url}/components/orderComponents`, {
        orderList: orderList
      })
      clearCart();
    }
  };

  //clear the order if the users wants to
  const clearCart = () => {
    removeAllItems()
  };

  const [cartTotal, setCartTotal] = useState(0)

  //removing a single items from the cart
  const removeItemFromCart = (id : number) => {
    removeItem(id)
  }

  //loading the catalog of inventory at the beginning
  useEffect(() => {
    orderList.orderList.forEach((order: Order) => {
      setCartTotal(cartTotal => cartTotal + order.price * order.selectedQuantity)
    })
    return () => {
      setCartTotal(0)
    }
  }, [orderList.orderList])

  return (
    <Box>
      <Paper className={styles.componentBilling}>
        <h2>Order</h2>
        <Box className={styles.contents}>
          {
            orderList.orderList.map((order: Order) => (
              <Box className={styles.billingBox} key={order.id}>
                <RemoveCircleOutlineIcon className={styles.item} onClick={() => {removeItemFromCart(order.id)}}/>
                <Typography>{order.selectedQuantity} x {order.info} = ${order.selectedQuantity * order.price}</Typography>
              </Box>
            ))
          }
        </Box>
        <Box className={styles.total}>
          <Typography>Total: $ {cartTotal}</Typography>
        </Box>
      </Paper>
      <Box>
        <div>
          <br></br>
            <Button variant="contained" color="primary" onClick={updateQuantityOfListOrder}>
              Proceed
            </Button>
        </div>
        <br></br>
        <div>
          <Button variant="contained" color="primary" onClick={() => { clearCart(); }}>
            Clear Cart
          </Button>
        </div>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: any) => {
  return {
    orderList: state.orderList
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeItem: (index: number) => dispatch(removeItem(index)),
    removeAllItems: () => dispatch(removeAllItem())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentBilling);
