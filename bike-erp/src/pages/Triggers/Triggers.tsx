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
    console.log("useEffect")
    Axios.get(`${url}/triggers/`).then((response) => {
      setTriggers(response.data);
    });
  }, [url]);

  const handleChange = async (id: string) => {
    await Axios.put(`${url}/triggers/toggle/` + id).catch((error) => {
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
                  key={trigger.trigger_id}
                  value={trigger.trigger_type}
                  control={
                    <Switch
                      color="primary"
                      checked={Boolean(trigger.activated)}
                      onChange={() => handleChange(trigger.trigger_id)}
                    />
                  }
                  label={trigger.trigger_type}
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
