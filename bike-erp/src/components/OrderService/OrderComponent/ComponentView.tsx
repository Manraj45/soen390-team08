import bike_logo from "../../../assets/images/login_bike_logo.png";

import { Box, CardMedia, Card, CardActions, Select, FormControl, InputLabel, MenuItem, Typography } from "@material-ui/core";
import useStyles from "./ComponentViewStyles";

/*
  The ModelView component is the component that renders a preview of the selected component
*/
const ModelView = ({ setSelectedLocation }: any) => {

  const styles = useStyles();

  const onSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedLocation(event.target.value as string)
  }
  
  return (
    <Box>
      <Card>
        <h2>MODEL</h2>
        <CardMedia title="bike-logo">
          <img src={bike_logo} className={styles.image} alt="bike-logo" />
        </CardMedia>
        <CardActions >
          <FormControl className={styles.location}>
            <InputLabel>Location</InputLabel>
            <Select name="componentLocation" id="compLoc" defaultValue={"None"} onChange={onSelect}>
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
      <Typography className={styles.message} variant="body1">*Please select a location, size and component before adding.</Typography>
    </Box>
  );
}

export default ModelView;