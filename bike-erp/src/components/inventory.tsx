import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Axios from "axios";

const preventDefault = (event: { preventDefault: () => void; }) => {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Inventory: React.FC = () => {

  const [inventoryTable, setInventoryTable] = useState<any[]>([])

  useEffect(() => {
    Axios.get("http://localhost:3001/components/").then((response) => {
      setInventoryTable(response.data)
      console.log(response.data)
    })
  }, [])

  const classes = useStyles();

  return (
    <React.Fragment>
      <div id="inventoryPageTest">
        <div className="Title"></div>
        <Table size="small" className="Table">
          <TableHead>
            <TableRow className="tableGrey">
              <TableCell />
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
                <TableCell className="tableGrey" />
                <TableCell>{row.component_type}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.component_status}</TableCell>
                <TableCell>{row.size}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            See more orders
        </Link>
        </div>

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