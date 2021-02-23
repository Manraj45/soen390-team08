import bike_logo from "../../../assets/images/login_bike_logo.png";

const ModelView = () => {
  return (
    <div className="componentView">
      <div className="modelName">
        <p>Lorem ipsum</p>
      </div>
      <div className="model">
        <img src={bike_logo} width="350px"/>
        {
          /* Dynamically create components from list */
        }
      </div>
      <div className="location" style={{display: "flex"}}>
        <p>Location</p>
        <select name="componentLocation" id="compLoc">
          <option value="Montreal">Montreal</option>
          <option value="Toronto">Toronto</option>
          <option value="Ottawa">Ottawa</option>
        </select>
      </div>
    </div>
  );
}

export default ModelView;