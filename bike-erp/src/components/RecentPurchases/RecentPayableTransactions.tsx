// DEPENDENCIES
import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

// SERVICES
import { BACKEND_URL } from "../../core/utils/config";

// STYLING
import { Button, Card, CardActions, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import useStyles from "./RecentPayableTransactionsStyles";

/*
  Displays the five most recent account payable transactions.
  Also links to the full account payable information.
*/
const RecentPayableTransactions = ({ account }: any) => {

  const classes = useStyles();
  const backend = BACKEND_URL;

  const [accountPayables, setAccountPayables] = useState([]);

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

  return (
    <Card variant="outlined" className={classes.recentPayableTransactions}>
      <CardContent style={{ paddingBottom: 0 }}>
        <Typography style={{ textTransform: "capitalize" }} variant="h5">
          Recent Account Payable Transactions
        </Typography>
      </CardContent>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerCell}>Order number</TableCell>
              <TableCell className={classes.headerCell}>Date</TableCell>
              <TableCell className={classes.headerCell}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              Object.keys(accountPayables).length < 5
              ? Object.values(accountPayables).map((order: any) => (
                  <TableRow key={order.account_payable_id}>
                    <TableCell>{order.account_payable_id}</TableCell>
                    <TableCell>{order.payable_date.substring(0, 10)}</TableCell>
                    <TableCell>{"$" + order.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))
              : Object.values(accountPayables).slice(0, 4).map((order: any) => (
                  <TableRow key={order.account_payable_id}>
                    <TableCell>{order.account_payable_id}</TableCell>
                    <TableCell>{order.payable_date.substring(0, 10)}</TableCell>
                    <TableCell>{"$" + order.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </CardContent>
      <CardActions className={classes.seeMore}>
        <Button href="/accountPayable" size="medium" style={{color: "white"}}>SEE MORE</Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state: any) => {
  return {
    account: state.account.account
  };
};

export default connect(mapStateToProps)(RecentPayableTransactions);