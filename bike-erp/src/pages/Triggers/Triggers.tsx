// DEPENDENCIES
import Axios from "axios";
import React, { useEffect, useState } from "react";

// SERVICES
import { BACKEND_URL } from "../../core/utils/config";

// STYLING
import { Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
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

  return (
    <React.Fragment>
      <div id="userLogsPage" className={styles.background}>
        <br></br>
        <div className={styles.title}>Triggers</div>
        <br></br>
        {triggers.map((trigger) => (
          <h3 key={trigger.trigger_type}>{trigger.trigger_type}</h3>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Triggers;