import axios from "axios";
import { useState, useEffect } from "react";

import { BACKEND_URL } from "../../core/utils/config";

import components from "./components.json";

import frame_utility from "../../assets/images/components/frame_utility.jpg";
import frame_touring from "../../assets/images/components/frame_touring.jpg";
import frame_mountain from "../../assets/images/components/frame_mountain.jpg";

import saddle_performance from "../../assets/images/components/saddle_performance.jpg";
import saddle_cushioned from "../../assets/images/components/saddle_cushioned.jpg";

import handlebar_flat from "../../assets/images/components/handlebar_flat.jpg";
import handlebar_bullhorn from "../../assets/images/components/handlebar_bullhorn.jpg";
import handlebar_drop from "../../assets/images/components/handlebar_drop.jpg";

import wheels_utility from "../../assets/images/components/wheel_utility.jpg";
import wheels_touring from "../../assets/images/components/wheel_touring.jpg";
import wheels_mountain from "../../assets/images/components/wheel_mountain.jpg";

import drivetrain_novice from "../../assets/images/components/drivetrain_novice.jpg";
import drivetrain_intermediate from "../../assets/images/components/drivetrain_intermediate.jpg";
import drivetrain_advanced from "../../assets/images/components/drivetrain_advanced.jpg";
import drivetrain_expert from "../../assets/images/components/drivetrain_expert.jpg";

import {
  Button,
  Grid,
  TextField,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import "./Components.css";
import { addItem, Order } from "../../redux/actions/OrderListActions/orderListAction";
import { connect } from "react-redux";

const WhiteButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(grey[50]),
    backgroundColor: "#FFFFFF",
    "&:hover": {
      backgroundColor: grey[200],
    },
  },
}))(Button);

const Components = ({
  selectedLocation,
  addItem,
  orderList
}: any) => {
  var frames = [frame_utility, frame_touring, frame_mountain];
  var saddles = [saddle_performance, saddle_cushioned];
  var handlebars = [handlebar_flat, handlebar_bullhorn, handlebar_drop];
  var wheels = [wheels_utility, wheels_touring, wheels_mountain];
  var drivetrains = [
    drivetrain_novice,
    drivetrain_intermediate,
    drivetrain_advanced,
    drivetrain_expert,
  ];

  const url = BACKEND_URL;
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [componentSelected, setComponentSelected] = useState("");
  const [componentTypeSelected, setComponentTypeSelected] = useState("");
  const [inventoryTable, setInventoryTable] = useState<any[]>([]);

  //selecting the component to order
  const setComponent = (
    componentSelected: string,
    componentTypeSelected: string
  ) => {
    setComponentSelected(componentSelected);
    setComponentTypeSelected(componentTypeSelected);
  };


  //filling the order list so we can build a receipt with multiple components
  const fillOrderList = (
    size: String,
    location: String,
    componentType: String,
    componentSpecificType: String,
    quantity: string
  ) => {
    let selectedId = "";
    let quantitySelected = 0;
    let totalQuantity = 0;

    inventoryTable.forEach((element) => {
      if (
        element.location_name === location &&
        element.size === size &&
        element.component_type === componentType &&
        element.specificComponentType === componentSpecificType
      ) {
        selectedId = element.component_id;

        //making sure that the input for quantity is a valid number
        quantitySelected = parseInt(quantity);
        totalQuantity = quantitySelected + element.quantity;

        if (
          orderList.orderList.every((order: any) => checkForDuplicateItem(order, parseInt(selectedId))) &&
          !isNaN(quantitySelected) &&
          /^\d*$/.test(quantity)
        ) {
          const info = element.size +
            " " +
            element.component_type +
            " " +
            element.specificComponentType +
            " (" +
            element.location_name +
            ") "
          addItem({ id: selectedId, quantity: totalQuantity, info: info, price: element.price, selectedQuantity: quantitySelected })

        }
      }
    });
  };

  const checkForDuplicateItem = (order: Order, selectedId: number) => {
    if (order.id !== selectedId) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    axios.get(`${url}/components/`).then((response) => {
      setInventoryTable(response.data);
    });
  }, [url, orderList]);

  return (
    <Grid
      container
      direction="column"
      justify="center"
      spacing={5}
      className="components"
    >
      <Grid item xs={12} container justify="flex-start" spacing={2}>
        <Grid item xs={3}><Typography id="size" variant="h6">Sizing</Typography></Grid>

        <Grid item xs={9} container>
          <Grid item xs={4}>
            <WhiteButton id="frames" variant="contained" onClick={() => setSize("SMALL")}>
              S
          </WhiteButton>
          </Grid>
          <Grid item xs={4}>
            <WhiteButton id="frames" variant="contained" onClick={() => setSize("MEDIUM")}>
              M
          </WhiteButton>
          </Grid>
          <Grid item xs={4}>
            <WhiteButton id="frames" variant="contained" onClick={() => setSize("LARGE")}>
              L
          </WhiteButton>
          </Grid>
        </Grid>
      </Grid>

      <Grid id="" item xs={12} container justify="flex-start" spacing={2}>
        <Grid item xs={3}> <Typography id="componentTitle" variant="h6">Frames</Typography></Grid>

        <Grid item container xs={9}>
          {components.frame.map((frame) => (
            <Grid item xs={6} md={4} key={frame.type}>
              <WhiteButton
                id="frames"
                className={frame.type}
                onClick={() => setComponent("FRAME", frame.type)}
              >
                <img src={frames[frame.img.pos]} alt={frame.img.alt} />
                <span className="prices">
                  <Typography>Prices</Typography>
                  <Typography>S: {frame.price.S} $</Typography>
                  <Typography>M: {frame.price.M} $</Typography>
                  <Typography>L: {frame.price.L} $</Typography>
                </span>
              </WhiteButton>
              <Typography>{frame.type}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12} container justify="flex-start" spacing={2}>
        <Grid item xs={3}><Typography id="componentTitle" variant="h6">Saddles</Typography></Grid>

        <Grid item container xs={9}>
          {components.saddle.map((saddle) => (
            <Grid item xs={6} md={4} key={saddle.type}>
              <WhiteButton
                id="frames"
                className={saddle.type}
                onClick={() => setComponent("SEAT", saddle.type)}
              >
                <img src={saddles[saddle.img.pos]} alt={saddle.img.alt} />
                <span className="prices">
                  <Typography>Prices</Typography>
                  <Typography>S: {saddle.price.S} $</Typography>
                  <Typography>M: {saddle.price.M} $</Typography>
                  <Typography>L: {saddle.price.L} $</Typography>
                </span>
              </WhiteButton>
              <Typography>{saddle.type}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item container justify="flex-start" spacing={2}>
        <Grid item xs={3}>
          <Typography id="componentTitle" variant="h6">Handle bars</Typography>
        </Grid>
        <Grid item container xs={9}>
          {components.handlebar.map((handlebar) => (
            <Grid item className={handlebar.type} key={handlebar.type} xs={6} md={4}>
              <WhiteButton id="frames" onClick={() => setComponent("HANDLE", handlebar.type)}>
                <img
                  src={handlebars[handlebar.img.pos]}
                  alt={handlebar.img.alt}
                />
                <span className="prices">
                  <Typography>Prices</Typography>
                  <Typography>S: {handlebar.price.S} $</Typography>
                  <Typography>M: {handlebar.price.M} $</Typography>
                  <Typography>L: {handlebar.price.L} $</Typography>
                </span>
              </WhiteButton>
              <Typography>{handlebar.type}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12} container justify="flex-start" spacing={2}>
        <Grid item xs={3}><Typography id="componentTitle" variant="h6">Wheels</Typography></Grid>
        <Grid item container xs={9}>
          {components.wheels.map((wheel) => (
            <Grid item xs={6} md={4} className={wheel.type} key={wheel.type}>
              <WhiteButton id="frames" onClick={() => setComponent("WHEEL", wheel.type)}>
                <img src={wheels[wheel.img.pos]} alt={wheel.img.alt} />
                <span className="prices">
                  <Typography>Prices</Typography>
                  <Typography>S: {wheel.price.S} $</Typography>
                  <Typography>M: {wheel.price.M} $</Typography>
                  <Typography>L: {wheel.price.L} $</Typography>
                </span>
              </WhiteButton>
              <Typography>{wheel.type}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12} container justify="flex-start" spacing={2}>
        <Grid item xs={3}>
          <Typography id="componentTitle" variant="h6">Drive trains</Typography>
        </Grid>
        <Grid item container xs={9}>
          {components.drivetrain.map((drivetrain) => (
            <Grid item xs={6} md={4} className={drivetrain.type} key={drivetrain.type}>
              <WhiteButton
                id="frames"
                onClick={() => setComponent("DRIVE_TRAIN", drivetrain.type)}
              >
                <img
                  src={drivetrains[drivetrain.img.pos]}
                  alt={drivetrain.img.alt}
                />
                <span className="prices">
                  <Typography>Prices</Typography>
                  <Typography>S: {drivetrain.price.S} $</Typography>
                  <Typography>M: {drivetrain.price.M} $</Typography>
                  <Typography>L: {drivetrain.price.L} $</Typography>
                </span>
              </WhiteButton>
              <Typography>{drivetrain.type}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12} container justify="flex-start" spacing={2}>
        <Grid item xs={4}><Typography id="componentTitle" variant="h6">Quantity: </Typography></Grid>

        <Grid item xs={4}>
          <TextField
            variant="outlined"
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              fillOrderList(
                size,
                selectedLocation,
                componentSelected,
                componentTypeSelected,
                quantity
              )
            }
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: any) => {
  return {
    orderList: state.orderList
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addItem: (order: Order) => dispatch(addItem(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Components);
