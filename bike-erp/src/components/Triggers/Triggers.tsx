// DEPENDENCIES
import Axios from "axios";
import React, { useEffect, useState } from "react";

// SERVICES
import { BACKEND_URL } from "../../core/utils/config";

// STYLING
import {
  Switch,
  FormGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";
import useStyles from "./TriggersStyles";

/*
  The Triggers component.
  Admins, managers and employees can view triggers and activate/deactivate them.
*/
const Triggers = (props) => {
  const styles = useStyles();
  const url = BACKEND_URL;

  const [triggers, setTriggers] = useState<any[]>([]);

  useEffect(() => {
    Axios.get(`${url}/triggers`).then((response) => {
      console.log(response.data);
      setTriggers(response.data);
    });
  }, [url]);

  const handleChange = async (triggerType: string) => {
    await Axios.put(`${url}/triggers/toggle/` + triggerType).catch((error) => {
      console.log(error.data);
    });
    Axios.get(`${url}/triggers/`).then((response) => {
      setTriggers(response.data);
    });
  };

  return (
    <React.Fragment>
      <div id="triggerComponent" className={styles.background}>
        <br></br>
        <div className={styles.title}>Triggers</div>
        {triggers.map((trigger) => (
          <FormControl>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={Boolean(trigger.QUANTITY_REACHES_ZERO)}
                    onChange={() => handleChange("QUANTITY_REACHES_ZERO")}
                  />
                }
                label="Receive email when component quantity reaches zero"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={Boolean(trigger.ROLE_CHANGE)}
                    onChange={() => handleChange("ROLE_CHANGE")}
                  />
                }
                label="Send an email upon changing a user's role"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={Boolean(trigger.COMPONENT_ORDER)}
                    onChange={() => handleChange("COMPONENT_ORDER")}
                  />
                }
                label="Receive an email upon order completion for a component"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={Boolean(trigger.BIKE_ORDER)}
                    onChange={() => handleChange("BIKE_ORDER")}
                  />
                }
                label="Receive email upon order completion for a bike"
                labelPlacement="start"
              />
            </FormGroup>
          </FormControl>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Triggers;
