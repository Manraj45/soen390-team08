import { Button, Paper } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { BACKEND_URL } from "../../core/utils/config";
import "./OrderBiling.css";

const OrderBiling = ({
  setOrderList,
  orderList,
  setOrderListQuantity,
  orderListQuantity,
  setOrderListInfo,
  orderListInfo,
}: any) => {
  const url = BACKEND_URL;

  const updateQuantityOfListOrder = () => {
    if (!(orderList == null)) {
      orderList.forEach((element: any) => {
        axios
          .put(`${url}/components/updateQuantity/`, {
            id: element,
            quantity: orderListQuantity[orderList.indexOf(element)],
          })
          .catch((error) => {
            console.log(error);
          });
      });
      clearCart();
    }
  };

  const clearCart = () => {
    setOrderList([]);
    setOrderListQuantity([]);
    setOrderListInfo([]);
  };

  return (
    <Paper className="orderBiling">
      <h2>Billing</h2>
      <div className="contents">
        {orderList.map((element: number) => (
          <div key={element}>
            {orderListQuantity[orderList.indexOf(element)]} x{" "}
            {orderListInfo[orderList.indexOf(element)]}
          </div>
        ))}
      </div>
      <div className="total">
        <p>Total: </p>
        <p>{/* dynamically compute total */}</p>
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

export default OrderBiling;
