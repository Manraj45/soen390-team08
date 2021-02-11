import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Generate fake  data
function createData(name: string, quantity: number, location: string, cost: number) {
  return { name, quantity, location, cost };
}

// Temporary
const rows = [
  createData('seat', 200, 'Montreal, QC, CA', 112.44),
  createData('handle', 150, 'Toronto, ON, CA', 50.99),
  createData('frame', 500, 'Montreal, QC, CA', 300.00),
];

function preventDefault(event: { preventDefault: () => void; }) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const : React.FC = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className="Title"></div>
      <Table size="small" className="Table">
        <TableHead>
          <TableRow className="tableGrey">
            <TableCell/>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell className="tableGrey"/>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}

export default ;