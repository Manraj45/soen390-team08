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
const UserLogs: React.FC = () => {

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
        <Table size="small" className={styles.tableStyle}>
          <TableHead className={styles.tableHead}>
            <TableRow className={styles.topRow}>
              <TableCell className={styles.emptyCell} />
              <TableCell>Time</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Activity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logTable.map((row) => (
              <TableRow key={row.log_id}>
                <TableCell className={styles.tableHead} />
                <TableCell className={styles.innerTable}>
                  {row.timestamp}
                </TableCell>
                <TableCell className={styles.innerTable}>
                  {row.email}
                </TableCell>
                <TableCell className={styles.innerTable}>
                  {row.activity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default UserLogs;