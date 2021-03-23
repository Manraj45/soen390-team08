import {
  Card, CardContent, CardMedia, CardActions,
  FormControl, InputLabel, MenuItem, Select, Typography
} from "@material-ui/core";
import useStyles from "./BikeModelStyles";

const BikeModel = ({ mostRecentType, mostRecentPicture, setSelectedLocation }: any) => {

  const styles = useStyles();

  const onSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedLocation(event.target.value as string);
  };
  
  return (
    <div>
      <Card>
        <CardContent>
          <Typography style={{ textTransform: "capitalize" }} variant="h4">
            {mostRecentType}
          </Typography>
          <CardMedia title="bike-logo">
            <img src={mostRecentPicture} className={styles.image} alt="bike-logo" />
          </CardMedia>
        </CardContent>
        <CardActions>
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
    </div>

  );
};

export default BikeModel;