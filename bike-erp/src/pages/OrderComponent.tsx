import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import OrderBiling from "../components/OrderService/OrderBiling";
import Components from "../components/OrderService/OrderComponent/Components";
import ModelView from "../components/OrderService/OrderComponent/ModelView";
import "./OrderComponent.css";

const OrderComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState("None");

  return (
    <div>
      <Grid container spacing={4} justify="space-evenly" alignItems="stretch">
        <Grid item md={5} xs={12}>
          <ModelView setSelectedLocation={setSelectedLocation}></ModelView>
        </Grid>
        <Grid item md={4} xs={12}>
          <Components
            selectedLocation={selectedLocation}
          ></Components>
        </Grid>
        <Grid item md={3} xs={12}>
          <OrderBiling></OrderBiling>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderComponent;
