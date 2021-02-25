import { CardMedia, Card, CardActions, Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import bike_logo from "../../../assets/images/login_bike_logo.png";

import "./ModelView.css";

const ModelView = ({setSelectedLocation} : any) => {

  const onSelect=(event: React.ChangeEvent<{value: unknown}>)=>{
      setSelectedLocation(event.target.value as string)
  }
  const styles = {
    media: {
      height: 0,
      paddingTop: '60%',
      marginTop:'30'
    },
    location:{
      minWidth:200,
    },
    image:{
      width:500,
    }
  };
  return (
    <Card>
      <h2>MODEL</h2>
      <CardMedia title="bike-logo">
        <img src={bike_logo} style={styles.image} alt="bike-logo"/>
        {
        /* Dynamically create components from list */
        }
      </CardMedia>
      <CardActions >
        <FormControl style={styles.location}>
          <InputLabel>Location</InputLabel>
          <Select name="componentLocation" id="compLoc"
            onChange={onSelect}
          >
            <MenuItem selected disabled value={""}>
                <em>None</em>
            </MenuItem>
            <MenuItem value={"MONTREAL"}>Montreal</MenuItem>
            <MenuItem value={"TORONTO"}>Toronto</MenuItem>
            <MenuItem value={"OTTAWA"}>Ottawa</MenuItem>
          </Select>
        </FormControl>
      </CardActions>
    </Card>
  );
}

export default ModelView;