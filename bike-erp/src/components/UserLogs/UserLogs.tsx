import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import useStyles from "../Inventory/inventoryStyles";
import {BACKEND_URL} from "../../core/utils/config";

/*
    UserLogs page. Admins can view logs and audit trails of all users.
*/
const UserLogs: React.FC = () => {
    const [logTable, setlogTable] = useState<any[]>([]);
    const url = BACKEND_URL;

  useEffect(() => {
    Axios.get(`${url}/userlogs/`).then((response) => {
        setlogTable(response.data);
    });
  }, []);

  const classes = useStyles();

  return (
    <React.Fragment>
      <div id="userLogsPage" className={classes.background}>
        <br></br>
        <div className={classes.title}>User Logs</div>
        <br></br>
        <Table size="small" className={classes.tableStyle}>
          <TableHead className={classes.tableHead}>
            <TableRow className={classes.topRow}>
              <TableCell className={classes.emptyCell} />
              <TableCell>Time</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Activity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logTable.map((row) => (
              <TableRow key={row.log_id}>
                <TableCell className={classes.tableHead} />
                <TableCell className={classes.innerTable}>
                  {row.timestamp}
                </TableCell>
                <TableCell className={classes.innerTable}>
                  {row.email}
                </TableCell>
                <TableCell className={classes.innerTable}>
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