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
  const [sortOrder, setSortOrder] = useState({ 'componentType': 0, 'price': 0, 'quantity': 0, 'component_status': 0, 'size': 0, 'specificComponentType': 0, 'location_name': 0 });

  useEffect(() => {
    axios.get("http://localhost:3001/components/").then((response) => {
      setInventoryTable(response.data);
    });
  }, []);

  const classes = useStyles();

  const sortTable = (sortBy: string) => {
    let sortBy2 = sortBy + '2'
    let sortedTable = inventoryTable.slice(0);

    let sortDirection = sortOrder[sortBy];
    let newSortDirection = sortOrder;

    sortedTable.sort(function (a, b) {
      let x = '';
      let y = '';

      const sortByObject = {
        'component_type': a.component_type,
        'component_type2': b.component_type,
        'price': a.price,
        'price2': b.price,
        'quantity': a.quantity,
        'quantity2': b.quantity,
        'component_status': a.component_status,
        'component_status2': b.component_status,
        'size': a.size,
        'size2': b.size,
        'specificComponentType': a.specificComponentType,
        'specificComponentType2': b.specificComponentType,
        'location_name': a.location_name,
        'location_name2': b.location_name
      }

      if (sortDirection === 0) {
        x = sortByObject[sortBy];
        y = sortByObject[sortBy2];
        return x < y ? -1 : x > y ? 1 : 0;
      }
      else {
        x = sortByObject[sortBy];
        y = sortByObject[sortBy2];
        return x > y ? -1 : x < y ? 1 : 0;
      }


    });
    if (sortDirection === 0) {
      newSortDirection[sortBy] = 1
      setSortOrder(newSortDirection);
    } else {
      newSortDirection[sortBy] = 0
      setSortOrder(newSortDirection);
    }

    setInventoryTable([...sortedTable])
  }

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
                <TableCell className={classes.topRow}><button type="button" onClick={() => sortTable('component_type')}>Type</button></TableCell>
                <TableCell className={classes.topRow}><button type="button" onClick={() => sortTable('price')}>Price</button></TableCell>
                <TableCell className={classes.topRow}><button type="button" onClick={() => sortTable('quantity')}>Quantity</button></TableCell>
                <TableCell className={classes.topRow}><button type="button" onClick={() => sortTable('component_status')}>Status</button></TableCell>
                <TableCell className={classes.topRow}><button type="button" onClick={() => sortTable('size')}>Size</button></TableCell>
                <TableCell className={classes.topRow}><button type="button" onClick={() => sortTable('specificComponentType')}>Component Type</button></TableCell>
                <TableCell className={classes.topRow}><button type="button" onClick={() => sortTable('location_name')}>Location</button></TableCell>
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
