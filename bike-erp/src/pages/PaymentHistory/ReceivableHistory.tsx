// DEPENDENCIES
import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

// SERVICES
import { BACKEND_URL } from "../../core/utils/config";

// STYLING
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import useStyles from "./ReceivableHistoryStyle";

/*
  This page pertains to the accounts receivable.
  This page is accessible to users to track their expenses relative to ordering bikes.
*/
const ReceivableHistory = ({ account }: any) => {

  const classes = useStyles();
  const backend = BACKEND_URL;

  const [accountReceivables, setAccountReceivables] = useState({});
  const [accountSpecifics, setAccountSpecifics] = useState({});

  useEffect(() => {
    axios
    .get(`${backend}/finance/accountReceivables`)
    .then((response) => {
      setAccountReceivables(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [backend]);

  const getAccountSpecifics = (id: number) => {
    axios
    .get(`${backend}/finance/accountReceivables/${id}/bikes`)
    .then((response) => {
      setAccountSpecifics(response.data)
    })
    .catch((error) => {
      console.log(error.data);
    });
  }
  
  return (
    <div className={classes.receivableHistory}>
      <h1>Receivable History</h1>
      <div className={classes.userDetails}>
        <Typography>{account.firstName + " " + account.lastName}</Typography>
        <Typography variant="caption">{account.email}</Typography>
      </div>
      <div className={classes.dataContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.orderCell}>Order number</TableCell>
              <TableCell className={classes.orderCell}>Date</TableCell>
              <TableCell className={classes.orderCell}>Total</TableCell>
              <TableCell className={classes.orderCell}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            Object.keys(accountReceivables).length !== 0 && Object.values(accountReceivables).map((order: any) => (
              <TableRow key={order.account_receivable_id}>
                <TableCell className={classes.orderCell}>{order.account_receivable_id}</TableCell>
                <TableCell className={classes.orderCell}>{order.payable_date.substring(0, 10)}</TableCell>
                <TableCell className={classes.orderCell}>{"$" +order.total}</TableCell>
                <TableCell className={classes.orderCell}>
                  <Button color="primary" 
                    onClick={() => getAccountSpecifics(order.account_receivable_id)}
                  >
                    See More
                  </Button>
                </TableCell>
              </TableRow>
            ))
          }
          </TableBody>
        </Table>
      </div>
      <div>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell colSpan={4} className={classes.orderCell}>Order Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.orderCell}>ID</TableCell>
              <TableCell className={classes.orderCell}>Description</TableCell>
              <TableCell className={classes.orderCell}>Quantity</TableCell>
              <TableCell className={classes.orderCell}>Cost</TableCell>
            </TableRow>
            {
              accountSpecifics !== {} && Object.values(accountSpecifics).map((item: any) => (
                <TableRow key={item.bike_id}>
                  <TableCell className={classes.orderCell}>{item.bike_id}</TableCell>
                  <TableCell className={classes.orderCell}>
                    {item.size + " " + item.color + " " + item.grade + " grade bike"}
                  </TableCell>
                  <TableCell className={classes.orderCell}>{item.quantity}</TableCell>
                  <TableCell className={classes.orderCell}>{"$" + item.price}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    account: state.account.account
  };
};

export default connect(mapStateToProps)(ReceivableHistory);