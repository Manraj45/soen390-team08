import axios from "axios";
import { useState, useEffect } from "react";

import { BACKEND_URL } from "../../../core/utils/config";

import components from "./components.json";

import frame_utility from "../../../assets/images/components/frame_utility.jpg";
import frame_touring from "../../../assets/images/components/frame_touring.jpg";
import frame_mountain from "../../../assets/images/components/frame_mountain.jpg";

import saddle_performance from "../../../assets/images/components/saddle_performance.jpg";
import saddle_cushioned from "../../../assets/images/components/saddle_cushioned.jpg";

import handlebar_flat from "../../../assets/images/components/handlebar_flat.jpg";
import handlebar_bullhorn from "../../../assets/images/components/handlebar_bullhorn.jpg";
import handlebar_drop from "../../../assets/images/components/handlebar_drop.jpg";

import wheels_utility from "../../../assets/images/components/wheel_utility.jpg";
import wheels_touring from "../../../assets/images/components/wheel_touring.jpg";
import wheels_mountain from "../../../assets/images/components/wheel_mountain.jpg";

import drivetrain_novice from "../../../assets/images/components/drivetrain_novice.jpg";
import drivetrain_intermediate from "../../../assets/images/components/drivetrain_intermediate.jpg";
import drivetrain_advanced from "../../../assets/images/components/drivetrain_advanced.jpg";
import drivetrain_expert from "../../../assets/images/components/drivetrain_expert.jpg";

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
import { addItem, Order } from "../../../redux/actions/OrderListActions/orderListAction";
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
          addItem({ id: selectedId, quantity: totalQuantity, info: info, price: element.price, selectedQuantity : quantitySelected })

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
      <Grid item container justify="flex-start" spacing={1}>
        <Typography variant="h6">Sizing</Typography>
        <Grid item>
          <WhiteButton variant="contained" onClick={() => setSize("SMALL")}>
            S
          </WhiteButton>
        </Grid>
        <Grid item>
          <WhiteButton variant="contained" onClick={() => setSize("MEDIUM")}>
            M
          </WhiteButton>
        </Grid>
        <Grid item>
          <WhiteButton variant="contained" onClick={() => setSize("LARGE")}>
            L
          </WhiteButton>
        </Grid>
      </Grid>
      <Grid item container justify="flex-start" spacing={1}>
        <Typography variant="h6">Frames</Typography>
        {components.frame.map((frame) => (
          <Grid item key={frame.type}>
            <WhiteButton
              className={frame.type}
              onClick={() => setComponent("FRAME", frame.type)}
            >
              <img src={frames[frame.img.pos]} alt={frame.img.alt} />
            </WhiteButton>
          </Grid>
        ))}
      </Grid>
      <Grid item container justify="flex-start" spacing={1}>
        <Typography variant="h6">Saddles</Typography>
        {components.saddle.map((saddle) => (
          <Grid item key={saddle.type}>
            <WhiteButton
              className={saddle.type}
              onClick={() => setComponent("SEAT", saddle.type)}
            >
              <img src={saddles[saddle.img.pos]} alt={saddle.img.alt} />
            </WhiteButton>
          </Grid>
        ))}
      </Grid>
      <Grid item container justify="flex-start" spacing={1}>
        <Typography variant="h6">Handlebars</Typography>
        {components.handlebar.map((handlebar) => (
          <Grid item className={handlebar.type} key={handlebar.type}>
            <WhiteButton onClick={() => setComponent("HANDLE", handlebar.type)}>
              <img
                src={handlebars[handlebar.img.pos]}
                alt={handlebar.img.alt}
              />
            </WhiteButton>
          </Grid>
        ))}
      </Grid>
      <Grid item container justify="flex-start" spacing={1}>
        <Typography variant="h6">Wheels</Typography>
        {components.wheels.map((wheel) => (
          <Grid item className={wheel.type} key={wheel.type}>
            <WhiteButton onClick={() => setComponent("WHEEL", wheel.type)}>
              <img src={wheels[wheel.img.pos]} alt={wheel.img.alt} />
            </WhiteButton>
          </Grid>
        ))}
      </Grid>
      <Grid item container justify="flex-start" spacing={1}>
        <Typography variant="h6">Drivetrains</Typography>
        {components.drivetrain.map((drivetrain) => (
          <Grid item className={drivetrain.type} key={drivetrain.type}>
            <WhiteButton
              onClick={() => setComponent("DRIVE_TRAIN", drivetrain.type)}
            >
              <img
                src={drivetrains[drivetrain.img.pos]}
                alt={drivetrain.img.alt}
              />
            </WhiteButton>
          </Grid>
        ))}
      </Grid>
      <Grid item container justify="flex-start" spacing={1}>
        <Typography variant="h6">Quantity : </Typography>
        <Grid item>
          <TextField
            variant="outlined"
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </Grid>
        <Grid item>
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
        {/*p tags for demo purposes*/}
      </Grid>
      <Grid item>
        <p>{size}</p>
        <p>{componentSelected}</p>
        <p>{componentTypeSelected}</p>
        <p>{selectedLocation}</p>
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
