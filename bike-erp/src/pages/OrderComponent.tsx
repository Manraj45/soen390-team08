import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import OrderBiling from "../components/OrderService/OrderBiling";
import Components from "../components/OrderService/OrderComponent/Components";
import ModelView from "../components/OrderService/OrderComponent/ModelView";
import "./OrderComponent.css";

const OrderComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [orderListQuantity, setOrderListQuantity] = useState([]);
  const [orderListInfo, setOrderListInfo] = useState([]);

  return (
    <div>
      <Grid container spacing={4} justify="space-evenly" alignItems="stretch">
        <Grid item xs={5}>
          <ModelView setSelectedLocation={setSelectedLocation}></ModelView>
        </Grid>
        <Grid item xs={5}>
          <Components
            selectedLocation={selectedLocation}
            setOrderList={setOrderList}
            orderList={orderList}
            setOrderListQuantity={setOrderListQuantity}
            orderListQuantity={orderListQuantity}
            setOrderListInfo={setOrderListInfo}
            orderListInfo={orderListInfo}
          ></Components>
        </Grid>
        <Grid item xs={2}>
          <OrderBiling
            setOrderList={setOrderList}
            orderList={orderList}
            setOrderListQuantity={setOrderListQuantity}
            orderListQuantity={orderListQuantity}
            setOrderListInfo={setOrderListInfo}
            orderListInfo={orderListInfo}
          ></OrderBiling>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderComponent;
