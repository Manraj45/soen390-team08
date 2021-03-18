import { CardMedia, Card, CardActions, Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import bike_logo from "../../../assets/images/login_bike_logo.png";
import { Box,Typography } from "@material-ui/core";
import "./ModelView.css";

const ModelView = ({ setSelectedLocation }: any) => {

  const onSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedLocation(event.target.value as string)
  }
  const styles = {
    media: {
      height: 0,
      paddingTop: '60%',
      marginTop: '30'
    },
    location: {
      minWidth: 200,
    },
    image: {
      width: "100%",
      height:"100%"
    }
  };
  return (
    <Box>
      <Card>
        <h2>MODEL</h2>
        <CardMedia title="bike-logo">
          <img src={bike_logo} style={styles.image} alt="bike-logo" />
          {
            /* Dynamically create components from list */
          }
        </CardMedia>
        <CardActions >
          <FormControl style={styles.location}>
            <InputLabel>Location</InputLabel>
            <Select name="componentLocation" id="compLoc" defaultValue={"None"}
              onChange={onSelect}
            >
              <MenuItem selected disabled value={"None"}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={"MONTREAL"}>Montreal</MenuItem>
              <MenuItem value={"TORONTO"}>Toronto</MenuItem>
              <MenuItem value={"OTTAWA"}>Ottawa</MenuItem>
            </Select>
          </FormControl>
        </CardActions>
      </Card>
      <Typography className="message" variant="body1">*Please select a location, size and component before adding.</Typography>
    </Box>
  );
}

export default ModelView;