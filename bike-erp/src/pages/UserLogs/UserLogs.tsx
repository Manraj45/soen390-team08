// DEPENDENCIES
import Axios from "axios";
import React, { useEffect, useState } from "react";

// SERVICES
import { BACKEND_URL } from "../../core/utils/config";

// STYLING
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@material-ui/core";
import useStyles from "./UserLogsStyles";

/*
  The UserLogs page.
  Admins can view logs and audit trails of all users.
*/
const UserLogs: React.FC = () => {

  const styles = useStyles();
  const url = BACKEND_URL;

  const [logTable, setlogTable] = useState<any[]>([]);

  useEffect(() => {
    Axios.get(`${url}/userlogs/`).then((response) => {
      setlogTable(response.data);
    });
  }, [url]);

  return (
    <React.Fragment>
      <div id="userLogsPage" className={styles.background}>
        <br></br>
        <div className={styles.title}>User Logs</div>
        <br></br>
        <Paper className={styles.place}>
          <Table size="small" stickyHeader className={styles.tableStyle}>
            <TableHead className={styles.tableHead}>
              <TableRow>
                <TableCell className={styles.topRow}>Time</TableCell>
                <TableCell className={styles.topRow}>User</TableCell>
                <TableCell className={styles.topRow}>Activity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logTable.map((row) => (
                <TableRow key={row.log_id}>
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
        </Paper>
      </div>
    </React.Fragment>
  );
};

export default UserLogs;