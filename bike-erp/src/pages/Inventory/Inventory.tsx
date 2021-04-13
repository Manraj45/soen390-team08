// DEPENDENCIES
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../core/utils/config"

// STYLING
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, TableSortLabel, createMuiTheme, ThemeProvider } from "@material-ui/core"
import useStyles from "./InventoryStyles";

/*
  The inventory page.
  This shows what a logged-in user's inventory contains.
*/
const Inventory: React.FC = () => {
  const [inventoryTable, setInventoryTable] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState({ 'component_type': 0, 'price': 0, 'quantity': 0, 'component_status': 0, 'size': 0, 'specificComponentType': 0, 'location_name': 0 });
  const [arrowUp, setArrowUp] = useState({ 'component_type': true, 'price': true, 'quantity': true, 'component_status': true, 'size': true, 'specificComponentType': true, 'location_name': true });
  const URL = BACKEND_URL

  useEffect(() => {
    axios.get(`${URL}/components`).then((response) => {
      setInventoryTable(response.data);
    });
  }, []);

  const classes = useStyles();

  const theme = createMuiTheme({
    overrides: {
      MuiTableSortLabel: {
        icon: {
          color: "white",
          opacity: 1,
          marginBottom: "3px",
        },
      },
    },
  });

  // Method to sort table depending on the column header clicked
  const sortTable = (sortBy: string) => {
    let sortBy2 = sortBy + '2';
    let sortedTable = inventoryTable.slice(0);
    let sortDirection = sortOrder[sortBy];
    let newSortDirection = sortOrder;
    let newArrowDirection = arrowUp;

    sortedTable.sort((a, b) => {
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
      } else {
        x = sortByObject[sortBy];
        y = sortByObject[sortBy2];
        return x > y ? -1 : x < y ? 1 : 0;
      }
    });

    if (sortDirection === 0) {
      newSortDirection[sortBy] = 1;
      newArrowDirection[sortBy] = true;
    } else {
      newSortDirection[sortBy] = 0;
      newArrowDirection[sortBy] = false;
    }

    setSortOrder(newSortDirection);
    setArrowUp(newArrowDirection);
    setInventoryTable([...sortedTable]);
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
                <ThemeProvider theme={theme}>
                  <TableCell className={classes.topRow}> Type <TableSortLabel direction={arrowUp['component_type'] ? "asc" : "desc"} onClick={() => sortTable('component_type')}></TableSortLabel></TableCell>
                  <TableCell className={classes.topRow}> Price <TableSortLabel direction={arrowUp['price'] ? "asc" : "desc"} onClick={() => sortTable('price')}></TableSortLabel></TableCell>
                  <TableCell className={classes.topRow}> Quantity <TableSortLabel direction={arrowUp['quantity'] ? "asc" : "desc"} onClick={() => sortTable('quantity')}></TableSortLabel></TableCell>
                  <TableCell className={classes.topRow}> Status <TableSortLabel direction={arrowUp['component_status'] ? "asc" : "desc"} onClick={() => sortTable('component_status')}></TableSortLabel></TableCell>
                  <TableCell className={classes.topRow}> Size <TableSortLabel direction={arrowUp['size'] ? "asc" : "desc"} onClick={() => sortTable('size')}></TableSortLabel></TableCell>
                  <TableCell className={classes.topRow}> Component Type <TableSortLabel direction={arrowUp['specificComponentType'] ? "asc" : "desc"} onClick={() => sortTable('specificComponentType')}></TableSortLabel></TableCell>
                  <TableCell className={classes.topRow}> Location <TableSortLabel direction={arrowUp['location_name'] ? "asc" : "desc"} onClick={() => sortTable('location_name')}></TableSortLabel></TableCell>
                </ThemeProvider>
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
