// DEPENDENCIES
import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

// SERVICES
import { BACKEND_URL } from "../../core/utils/config";

// STYLING
import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import useStyles from "./PayableHistoryStyle";

/*
  This page pertains to the accounts payable.
  This page is accessible to companies to track their expenses relative to ordering components.
*/
const PayableHistory = ({ account }: any) => {

  const classes = useStyles();
  const backend = BACKEND_URL;

  const [accountPayables, setAccountPayables] = useState([]);
  const [accountSpecifics, setAccountSpecifics] = useState({});

  useEffect(() => {
    axios
      .get(`${backend}/finance/accountPayables`)
      .then((response) => {
        setAccountPayables(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  }, [backend]);

  const getAccountSpecifics = (id: number) => {
    axios
      .get(`${backend}/finance/accountPayables/${id}/transactionItem`)
      .then((response) => {
        setAccountSpecifics(response.data)
      })
      .catch((error) => {
        console.log(error.data);
      });
  }

  return (
    <div className={classes.payableHistory}>
      <h1>Accounts Payable</h1>
      <div className={classes.userDetails}>
        <Typography>{account.firstName + " " + account.lastName}</Typography>
        <Typography variant="caption">{account.email}</Typography>
      </div>
      <Paper className={classes.place}>
        <div>
          <Table size="small" className={classes.dataContainer}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeader}>Order number</TableCell>
                <TableCell className={classes.tableHeader}>Date</TableCell>
                <TableCell className={classes.tableHeader}>Total</TableCell>
                <TableCell className={classes.tableHeader}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                Object.keys(accountPayables).length !== 0 && Object.values(accountPayables).map((order: any) => (
                  <TableRow key={order.account_payable_id}>
                    <TableCell className={classes.orderCell}>{order.account_payable_id}</TableCell>
                    <TableCell className={classes.orderCell}>{order.payable_date.substring(0, 10)}</TableCell>
                    <TableCell className={classes.orderCell}>{"$" + order.total}</TableCell>
                    <TableCell className={classes.orderCell}>
                      <Button color="primary"
                        onClick={() => getAccountSpecifics(order.account_payable_id)}
                      >
                        See More
                    </Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
          <Table size="small" className={classes.dataContainer}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={3} className={classes.tableHeader}>Order Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={classes.orderCell}>Transaction ID</TableCell>
                <TableCell className={classes.orderCell}>Quantity</TableCell>
                <TableCell className={classes.orderCell}>Cost</TableCell>
              </TableRow>
              {
                accountSpecifics !== {} && Object.values(accountSpecifics).map((item: any) => (
                  <TableRow key={item.transaction_id}>
                    <TableCell className={classes.orderCell}>{item.transaction_id}</TableCell>
                    <TableCell className={classes.orderCell}>{item.quantity_bought}</TableCell>
                    <TableCell className={classes.orderCell}>{"$" + item.cost}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    account: state.account.account
  };
};

export default connect(mapStateToProps)(PayableHistory);