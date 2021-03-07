import { Button, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../../core/utils/config";
import "./OrderBiling.css";
import { Order, removeAllItem, removeItem } from "../../redux/actions/OrderListActions/orderListAction";
import { connect } from "react-redux";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Box } from "@material-ui/core";

const OrderBiling = ({
  orderList,
  removeItem,
  removeAllItems
}: any) => {
  const url = BACKEND_URL;

  const updateQuantityOfListOrder = () => {
    if (orderList.orderList.length > 0) {
      axios.put(`${url}/components/orderComponents`, {
        orderList: orderList
      })
      clearCart();
    }
  };

  const clearCart = () => {
    removeAllItems()
  };
  const [cartTotal, setCartTotal] = useState(0)

  const removeItemFromCart = (id : number) => {
    console.log(id)
    removeItem(id)
    console.log(orderList.orderList)
  }

  useEffect(() => {
    orderList.orderList.forEach((order: Order) => {
      setCartTotal(cartTotal => cartTotal + order.price * order.selectedQuantity)
    })
    return () => {
      setCartTotal(0)
    }
  }, [orderList.orderList])


  return (
    <Paper className="orderBiling">
      <h2>Order</h2>
      <div className="contents">
        {
          orderList.orderList.map((order: Order) => (
            <Box key={order.id}>
              <RemoveCircleOutlineIcon className="item" onClick={() => {removeItemFromCart(order.id)}}></RemoveCircleOutlineIcon>
              <Typography>{order.selectedQuantity} x {order.info} = ${order.selectedQuantity * order.price} </Typography>
            </Box>
          ))
        }

      </div>
      <div className="total">
        <Typography>Total: $ {cartTotal} </Typography>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={updateQuantityOfListOrder}
        >
          Proceed
        </Button>
      </div>
      <br></br>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            clearCart();
          }}
        >
          Clear Cart
        </Button>
      </div>
    </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderBiling);
