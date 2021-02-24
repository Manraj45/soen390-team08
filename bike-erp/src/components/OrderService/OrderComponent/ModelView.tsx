import bike_logo from "../../../assets/images/login_bike_logo.png";

const ModelView = ({setSelectedLocation} : any) => {

  const onSelect=(city : string)=>{
      setSelectedLocation(city)
  }

  return (
    <div className="componentView">
      <div className="modelName">
        <p>Lorem ipsum</p>
      </div>
      <div className="model">
        <img src={bike_logo} width="350px" alt="bike_logo"/>
        {
          /* Dynamically create components from list */
        }
      </div>
      <div className="location" style={{display: "flex"}}>
        <p>Location</p>
        <select name="componentLocation" id="compLoc"
          onChange={(e) => {
            const selectedLocation = e.target.value;
            onSelect(selectedLocation)
          }}
        >
          <option value = "MONTREAL">Montreal</option>
          <option value = "TORONTO">Toronto</option>
          <option value = "OTTAWA">Ottawa</option>
        </select>
      </div>
    </div>
  );
}

export default ModelView;