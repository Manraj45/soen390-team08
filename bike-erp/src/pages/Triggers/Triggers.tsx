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
  The Triggers page.
  Admins can view triggers and activate/deactivate them.
*/
const Triggers: React.FC = () => {
  const styles = useStyles();
  const url = BACKEND_URL;

  const [triggers, setTriggers] = useState<any[]>([]);

  useEffect(() => {
    Axios.get(`${url}/triggers/`).then((response) => {
      setTriggers(response.data);
    });
  }, [url]);

  const handleChange = (id: string) => {
    console.log(id);
    Axios.put(`${url}/triggers/toggle/` + id).catch((error) => {
      console.log(error.data);
    });
    Axios.get(`${url}/triggers/`).then((response) => {
      setTriggers(response.data);
    });
  };

  return (
    <React.Fragment>
      <div id="userLogsPage" className={styles.background}>
        <br></br>
        <div className={styles.title}>Triggers</div>
        <br></br>
        <div>
          <FormControl>
            <FormGroup>
              {console.log(triggers)}
              {triggers.map((trigger) => (
                <FormControlLabel
                  value="quantity_reaches_zero"
                  control={
                    <Switch
                      color="primary"
                      checked={trigger.activated}
                      onChange={() => handleChange(trigger.trigger_id)}
                    />
                  }
                  label="Quantity reaches zero"
                  labelPlacement="start"
                />
              ))}
            </FormGroup>
          </FormControl>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Triggers;
