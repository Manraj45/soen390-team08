import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import useStyles from "../Inventory/inventoryStyles";

const Inventory: React.FC = () => {
  const [inventoryTable, setInventoryTable] = useState<any[]>([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/components/").then((response) => {
      setInventoryTable(response.data);
      console.log(response.data);
    });
  }, []);

  const classes = useStyles();

  return (
    <React.Fragment>
      <div id="inventoryPageTest" className={classes.background}>
        <br></br>
        <div className={classes.title}>Inventory</div>
        <br></br>
        <Table size="small" className={classes.tableStyle}>
          <TableHead className={classes.tableHead}>
            <TableRow className={classes.topRow}>
              <TableCell className={classes.emptyCell} />
              <TableCell>Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Component Type</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryTable.map((row) => (
              <TableRow key={row.component_id}>
                <TableCell className={classes.tableHead} />
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
      </div>
    </React.Fragment>
  );
};

export default Inventory;
