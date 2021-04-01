// DEPENDENCIES
import axios from "axios";
import React, { useEffect, useState } from "react";

// STYLING
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@material-ui/core"
import useStyles from "./InventoryStyles";

/*
  The inventory page.
  This shows what a logged-in user's inventory contains.
*/
const Inventory: React.FC = () => {
  
  const [inventoryTable, setInventoryTable] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/components/").then((response) => {
      setInventoryTable(response.data);
    });
  }, []);

  const classes = useStyles();

  return (
    <React.Fragment>
      <div id="inventoryPageTest" className={classes.background}>
        <br></br>
        <div className={classes.title}>Inventory</div>
        <br></br>
        <Paper className={classes.place}>
        <Table size="small" stickyHeader className={classes.tableStyle}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.topRow}>Type</TableCell>
              <TableCell className={classes.topRow}>Price</TableCell>
              <TableCell className={classes.topRow}>Quantity</TableCell>
              <TableCell className={classes.topRow}>Status</TableCell>
              <TableCell className={classes.topRow}>Size</TableCell>
              <TableCell className={classes.topRow}>Component Type</TableCell>
              <TableCell className={classes.topRow}>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryTable.map((row) => (
              <TableRow key={row.component_id}>
                <TableCell className={classes.innerTable}>
                  {row.component_type}
                </TableCell>
                <TableCell className={classes.innerTable}>
                  {row.price}
                </TableCell>
                <TableCell className={classes.innerTable}>
                  {row.quantity}
                </TableCell>
                <TableCell className={classes.innerTable}>
                  {row.component_status}
                </TableCell>
                <TableCell className={classes.innerTable}>{row.size}</TableCell>
                <TableCell className={classes.innerTable}>
                  {row.specificComponentType}
                </TableCell>
                <TableCell className={classes.innerTable}>
                  {row.location_name}
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

export default Inventory;
