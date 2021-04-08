// DEPENDENCIES
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

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
const Triggers = ({ account, isAuthenticated }: any) => {
  const styles = useStyles();
  const url = BACKEND_URL;

  const [triggers, setTriggers] = useState<any[]>([]);

  useEffect(() => {
    Axios.get(`${url}/triggers`).then((response) => {
      setTriggers(response.data);
    });
  }, [url, account.authenticated, isAuthenticated, account.loading]);

  const handleChange = async (triggerType: string) => {
    await Axios.put(`${url}/triggers/toggle/` + triggerType);
    Axios.get(`${url}/triggers/`).then((response) => {
      setTriggers(response.data);
    });
  };

  return (
    <React.Fragment>
      <div id="triggerComponent" className={styles.background}>
        <br></br>
        {(account.account.role !== "CUSTOMER") && (
        <div className={styles.title}>Triggers</div>
        )}
        {triggers.map((trigger) => (
          <FormControl>
            <FormGroup>
              {(account.account.role === "ADMIN" || account.account.role === "MANAGER") && (
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
              )}
              {(account.account.role === "ADMIN" || account.account.role === "MANAGER" || account.account.role === "EMPLOYEE") && (
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
              )}
              {(account.account.role === "ADMIN" || account.account.role === "MANAGER" || account.account.role === "EMPLOYEE") && (
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
              )}
            </FormGroup>
          </FormControl>
        ))}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    account: state.account,
  };
};


export default connect(mapStateToProps)(Triggers);