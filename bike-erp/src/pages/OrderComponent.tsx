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
        <Grid item xs={5}>
          <ModelView setSelectedLocation={setSelectedLocation}></ModelView>
        </Grid>
        <Grid item xs={5}>
          <Components
            selectedLocation={selectedLocation}
          ></Components>
        </Grid>
        <Grid item xs={2}>
          <OrderBiling></OrderBiling>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderComponent;
