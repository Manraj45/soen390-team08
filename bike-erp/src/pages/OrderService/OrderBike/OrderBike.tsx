// DEPENDENCIES
import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

// SERVICES
import { BACKEND_URL } from "../../../core/utils/config";
import {
  addBike, removeBike, removeAllBikes,
  BikeSold, addComponentSold, removeComponentSold, removeAllComponents, ComponentUpdated
} from "../../../redux/actions/OrderBikeActions/orderBikeActions";

// COMPONENTS
import ModelView from "../../../components/OrderService/OrderBike/BikeModel";
import Components from "../../../components/OrderService/OrderBike/BikeComponents";
import Billing from "../../../components/OrderService/OrderBike/BikeBilling";

// STYLING + ASSETS
import bike_logo from "../../../assets/images/login_bike_logo.png";
import { Grid, Typography } from "@material-ui/core";
import useStyles from "./OrderBikeStyle";

/*
  This is the bike order page. Users can buy/build different bikes based on what they have in the inventory.
  All bikes must be build with components from the same location and the same size.
*/
const OrderBike = ({ bikeOrderList }: any) => {
  
  const styles = useStyles();

  const [selectedLocation, setSelectedLocation] = useState("None");
  const [mostRecentType, setMostRecent] = useState("None Selected");
  const [mostRecentPicture, setMostRecentPicture] = useState(bike_logo);
  const [inventoryTable, setInventoryTable] = useState<any[]>([]);
  const url = BACKEND_URL;

  useEffect(() => {
    axios.get(`${url}/components/`).then((response) => {
      setInventoryTable(response.data);
    });
  }, [url, bikeOrderList]);

  return (
    <div>
      <Typography variant="h4" className={styles.title}>Order Bike</Typography>
      <br />
      <Grid container spacing={4} justify="space-evenly" alignItems="center" >
        <Grid item xs={12} md={5}>
          <ModelView
            mostRecentType={mostRecentType}
            mostRecentPicture={mostRecentPicture}
            setSelectedLocation={setSelectedLocation}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Components
            setMostRecentPicture={setMostRecentPicture}
            setMostRecent={setMostRecent}
            selectedLocation={selectedLocation}
            inventoryTable={inventoryTable}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Billing/>
        </Grid>
      </Grid>
    </div>
  );
};


const mapStateToProps = (state: any) => {
  return {
    bikeOrderList: state.bikeOrderList
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addBike: (bikeSold: BikeSold) => dispatch(addBike(bikeSold)),
    removeBike: (bikeSold: BikeSold) => dispatch(removeBike(bikeSold)),
    removeAllBikes: () => dispatch(removeAllBikes()),
    addComponentSold: (componentUpdated: ComponentUpdated) => dispatch(addComponentSold(componentUpdated)),
    removeComponentSold: (id: number) => dispatch(removeComponentSold(id)),
    removeAllComponents: () => dispatch(removeAllComponents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBike);
