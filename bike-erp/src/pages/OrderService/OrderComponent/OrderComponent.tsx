// DEPENDENCIES
import { useState } from "react";

// SERVICES
import OrderBiling from "../../../components/OrderService/OrderComponent/ComponentBilling";
import Components from "../../../components/OrderService/OrderComponent/Components";
import ModelView from "../../../components/OrderService/OrderComponent/ComponentView";

// STYLING
import { Grid, Typography } from "@material-ui/core";
import useStyles from "./OrderComponentStyle";

/*
  This is the component order page. Companies can order different components to refurbish their inventory.
*/
const OrderComponent = () => {

  const styles = useStyles();
  const [selectedLocation, setSelectedLocation] = useState("None");

  return (
    <div>
      <Typography variant="h4" className={styles.title}>Order Components</Typography>
      <br/>
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
