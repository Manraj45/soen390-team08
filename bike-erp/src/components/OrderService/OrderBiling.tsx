import Button from "@material-ui/core/Button";
import axios from "axios";
import React from "react";
import { BACKEND_URL } from "../../core/utils/config";
import "./OrderBiling.css";

const OrderBiling = ({ setOrderList, orderList, setOrderListQuantity, orderListQuantity, setOrderListInfo, orderListInfo }: any) => {

  const url = BACKEND_URL

  const updateQuantityOfListOrder = () => {
    if (!(orderList == null)) {
      orderList.forEach((element: any) => {
        axios.put(`${url}/components/updateQuantity/`, {
          id: element,
          quantity: orderListQuantity[orderList.indexOf(element)]
        }).catch(error => {
          console.log(error);
        });
      });
      clearCart()
    }
  }

  const clearCart = () => {
    setOrderList([])
    setOrderListQuantity([])
    setOrderListInfo([])
  }

  return (
    <div className="orderBiling">
      <div className="header">
        Biling
      </div>
      <div className="contents">
        {orderList.map((element: React.ReactNode) => (
          <div>{orderListQuantity[orderList.indexOf(element)]} x {orderListInfo[orderList.indexOf(element)]}</div>
        ))}
      </div>
      <div className="total">
        <p>Total: </p>
        <p>{ /* dynamically compute total */}</p>
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={updateQuantityOfListOrder}>Proceed</Button>
      </div>
      <br></br>
      <div>
        <Button variant="contained" color="primary" onClick={() => { clearCart() }}>Clear Cart</Button>
      </div>
    </div>
  );
}

export default OrderBiling;