import { Button, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../../core/utils/config";
import "./OrderBiling.css";
import { Order, removeAllItem, removeItem } from "../../redux/actions/OrderListActions/orderListAction";
import { connect } from "react-redux";
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

  useEffect(() => {
    orderList.orderList.forEach((order: Order) => {
      setCartTotal(cartTotal => cartTotal + order.price * order.quantity)
    })
    return () => {
      setCartTotal(0)
    }
  }, [orderList.orderList])


  return (
    <Paper className="orderBiling">
      <h2>Billing</h2>
      <div className="contents">
        {
          orderList.orderList.map((order: Order) => (
            <Typography key={order.id}>{order.quantity} x {order.info} = ${order.quantity * order.price} </Typography>
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
