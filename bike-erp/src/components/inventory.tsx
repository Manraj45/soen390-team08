import React, {useEffect, useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Axios from "axios";
import useStyles from './inventoryStyles'

function preventDefault(event: { preventDefault: () => void; }) {
  event.preventDefault();
}

const Inventory : React.FC = () => {

  const [inventoryTable, setInventoryTable] = useState <any[]> ([])

  useEffect(() => {
    Axios.get("http://localhost:3001/components/").then((response) => {
      setInventoryTable(response.data)
      console.log(response.data)
    })
}, [])


  const classes = useStyles();

  return (

    <React.Fragment>
      <div id="inventoryPageTest" className={classes.background}>
      <br></br>
      <div className={classes.title}>Inventory</div>
      <br></br>
      <Table size="small" className={classes.tableStyle} >
        <TableHead className={classes.tableHead}>
          <TableRow className={classes.topRow}>
            <TableCell/>
            <TableCell>Type</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventoryTable.map((row) => (
            <TableRow key={row.component_id}>
              <TableCell className={classes.tableHead}/>
              <TableCell className={classes.innerTable}>{row.component_type}</TableCell>
              <TableCell className={classes.innerTable}>{row.price}</TableCell>
              <TableCell className={classes.innerTable}>{row.quantity}</TableCell>
              <TableCell className={classes.innerTable}>{row.component_status}</TableCell>
              <TableCell className={classes.innerTable}>{row.size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {inventoryTable.map((val) => {
        return (
            <h1>
              Price: {val.price}
            </h1>
        );
      })}
      </div>
    </React.Fragment>

    
  );
}

export default Inventory;