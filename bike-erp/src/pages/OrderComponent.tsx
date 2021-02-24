import Components from "../components/OrderService/OrderComponent/Components";
import ModelView from "../components/OrderService/OrderComponent/ModelView"
import OrderBiling from "../components/OrderService/OrderBiling";
import "./OrderComponent.css";
import { useState } from "react";

const OrderComponent = () => {

  const [selectedLocation, setSelectedLocation] = useState('');
  const [orderList, setOrderList] = useState([]);
  const [orderListQuantity, setOrderListQuantity] = useState([]);
  const [orderListInfo, setOrderListInfo] = useState([]);

  return (
    <div className="orderComponent">
      <ModelView setSelectedLocation={setSelectedLocation}></ModelView>
      <Components
        selectedLocation={selectedLocation}
        setOrderList={setOrderList}
        orderList={orderList}
        setOrderListQuantity={setOrderListQuantity}
        orderListQuantity={orderListQuantity}
        setOrderListInfo={setOrderListInfo}
        orderListInfo={orderListInfo}></Components>
      <OrderBiling
        setOrderList={setOrderList}
        orderList={orderList}
        setOrderListQuantity={setOrderListQuantity}
        orderListQuantity={orderListQuantity}
        setOrderListInfo={setOrderListInfo}
        orderListInfo={orderListInfo}></OrderBiling>
    </div>
  );
}

export default OrderComponent;