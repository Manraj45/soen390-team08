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

import { Button } from "@material-ui/core";
import "./Components.css";

const Components = ({ selectedLocation,
  setOrderList, orderList,
  setOrderListQuantity, orderListQuantity,
  setOrderListInfo, orderListInfo }: any ) =>
{
  var frames = [frame_utility, frame_touring, frame_mountain];
  var saddles = [saddle_performance, saddle_cushioned];
  var handlebars = [handlebar_flat, handlebar_bullhorn, handlebar_drop];
  var wheels = [wheels_utility, wheels_touring, wheels_mountain];
  var drivetrains = [drivetrain_novice, drivetrain_intermediate, drivetrain_advanced, drivetrain_expert];

  const url = BACKEND_URL;
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [componentSelected, setComponentSelected] = useState("")
  const [componentTypeSelected, setComponentTypeSelected] = useState("")
  const [inventoryTable, setInventoryTable] = useState<any[]>([])

  //selecting the component to order
  const setComponent = (componentSelected: string, componentTypeSelected: string) => {
    setComponentSelected(componentSelected);
    setComponentTypeSelected(componentTypeSelected);
  }

  //filling the order list so we can build a receipt with multiple components
  const fillOrderList = (size: String, location: String,
    componentType: String, componentSpecificType: String, quantity: string) => 
  {
    let selectedId = "";
    let quantitySelected = 0;

    inventoryTable.forEach(element => {
      if (
        element.location_name === location &&
        element.size === size &&
        element.component_type === componentType &&
        element.specificComponentType === componentSpecificType
      ) {
        selectedId = element.component_id;

        //making sure that the input for quantity is a valid number
        quantitySelected = parseInt(quantity);

        if (!orderList.includes(selectedId) && !isNaN(quantitySelected) && /^\d*$/.test(quantity)) {
          //adding information such as quantity, component id to the orderlist.
          setOrderList([...orderList, selectedId]);
          setOrderListQuantity([...orderListQuantity, quantitySelected]);
          setOrderListInfo([...orderListInfo, (element.size + " " + element.component_type + " " + element.specificComponentType + " (" + element.location_name + ") ")]);
        }
      }
    });
  }

  useEffect(() => {
    axios.get(`${url}/components/`).then((response) => {
      setInventoryTable(response.data);
    })
  }, [url])

  return (
    <div className="components">
      <div className="size">
        <div className="small" onClick={() => setSize("SMALL")}>S</div>
        <div className="medium" onClick={() => setSize("MEDIUM")}>M</div>
        <div className="large" onClick={() => setSize("LARGE")}>L</div>
      </div>
      <div className="frame">
        <h2>Frames</h2>
        {
          components.frame.map(frame =>
            <div className={frame.type} key={frame.type}>
              <img src={frames[frame.img.pos]} alt={frame.img.alt} onClick={() => setComponent("FRAME", frame.type)} width="100px" />
            </div>
          )
        }
      </div>
      <div className="saddle">
        <h2>Saddles</h2>
        {
          components.saddle.map(saddle =>
            <div className={saddle.type} key={saddle.type}>
              <img src={saddles[saddle.img.pos]} alt={saddle.img.alt} onClick={() => setComponent("SEAT", saddle.type)} width="100px" />
            </div>)
        }
      </div>
      <div className="handlebar">
        <h2>Handlebars</h2>
        {
          components.handlebar.map(handlebar =>
            <div className={handlebar.type} key={handlebar.type}>
              <img src={handlebars[handlebar.img.pos]} alt={handlebar.img.alt} onClick={() => setComponent("HANDLE", handlebar.type)} width="100px" />
            </div>)
        }
      </div>
      <div className="wheels">
        <h2>Wheels</h2>
        {
          components.wheels.map(wheel =>
            <div className={wheel.type} key={wheel.type}>
              <img src={wheels[wheel.img.pos]} alt={wheel.img.alt} onClick={() => setComponent("WHEEL", wheel.type)} width="100px" />
            </div>)
        }
      </div>
      <div className="drivetrain">
        <h2>Drivetrains</h2>
        {
          components.drivetrain.map(drivetrain =>
            <div className={drivetrain.type} key={drivetrain.type}>
              <img src={drivetrains[drivetrain.img.pos]} alt={drivetrain.img.alt} onClick={() => setComponent("DRIVE_TRAIN", drivetrain.type)} width="100px" />
            </div>)
        }
      </div>
      <div>
        <form>
          <label>
            Quantity :
            <input type="number" min="0" onChange={event => setQuantity(event.target.value)} />
          </label>
          <Button variant="contained" color="primary" onClick={() => fillOrderList(size, selectedLocation, componentSelected, componentTypeSelected, quantity)}>Add</Button> <br />
          {/*p tags for demo purposes*/}
          <p>{size}</p>
          <p>{componentSelected}</p>
          <p>{componentTypeSelected}</p>
          <p>{selectedLocation}</p>
        </form>
      </div>
    </div>
  );
}

export default Components;