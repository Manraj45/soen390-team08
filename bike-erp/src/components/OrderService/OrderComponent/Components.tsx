import React from "react";
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

import "./Components.css";

const Components = () => {

  const [size, setSize] = React.useState("");

  var frames = [frame_utility, frame_touring, frame_mountain];
  var saddles = [saddle_performance, saddle_cushioned];
  var handlebars = [handlebar_flat, handlebar_bullhorn, handlebar_drop];
  var wheels = [wheels_utility, wheels_touring, wheels_mountain];
  var drivetrains = [drivetrain_novice, drivetrain_intermediate, drivetrain_advanced, drivetrain_expert];

  return (
    <div className="components">
      <p>COMPONENTS</p>
      <div className="size">
        <div className="small" onClick={() => setSize("S")}>S</div>
        <div className="medium" onClick={() => setSize("M")}>M</div>
        <div className="large" onClick={() => setSize("L")}>L</div>
      </div>
      <div className="frame">
        <h2>Frames</h2>
        {
          components.frame.map(frame => 
            <div className={frame.type}>
              <img src={frames[frame.img.pos]} alt={frame.img.alt} width="100px"/>
            </div>
          )
        }
      </div>
      <div className="saddle">
        <h2>Saddles</h2>
        {
          components.saddle.map(saddle => 
            <div className={saddle.type}>
              <img src={saddles[saddle.img.pos]} alt={saddle.img.alt} width="100px"/>
            </div>)
        }
      </div>
      <div className="handlebar">
        <h2>Handlebars</h2>
        {
          components.handlebar.map(handlebar => 
            <div className={handlebar.type}>
              <img src={handlebars[handlebar.img.pos]} alt={handlebar.img.alt} width="100px"/>
            </div>)
        }
      </div>
      <div className="wheels">
        <h2>Wheels</h2>
        {
          components.wheels.map(wheel => 
            <div className={wheel.type}>
              <img src={wheels[wheel.img.pos]} alt={wheel.img.alt} width="100px"/>
            </div>)
        }
      </div>
      <div className="drivetrain">
        <h2>Drivetrains</h2>
        {
          components.drivetrain.map(drivetrain => 
            <div className={drivetrain.type}>
              <img src={drivetrains[drivetrain.img.pos]} alt={drivetrain.img.alt} width="100px"/>
            </div>)
        }
      </div>
    </div>
  );
}

export default Components;