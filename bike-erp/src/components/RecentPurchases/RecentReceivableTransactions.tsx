// DEPENDENCIES
import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

// SERVICES
import { BACKEND_URL } from "../../core/utils/config";

// STYLING
import { Button, Card, CardActions, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import useStyles from "./RecentTransactionsStyles";

const RecentReceivableTransactions = ({ account }: any) => {

  const classes = useStyles();
  const backend = BACKEND_URL;

  const [accountReceivables, setAccountReceivables] = useState([]);

  useEffect(() => {
    axios
      .get(`${backend}/finance/accountReceivables`)
      .then((response) => {
        setAccountReceivables(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  }, [backend]);

  return (
    <div className={classes.recentTransactions}>
      <Card variant="outlined">
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
                Object.keys(accountReceivables).length < 5
                ? Object.values(accountReceivables).map((order: any) => (
                    <TableRow key={order.account_receivable_id}>
                      <TableCell>{order.account_receivable_id}</TableCell>
                      <TableCell>{order.payable_date.substring(0, 10)}</TableCell>
                      <TableCell>{"$" + order.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                : Object.values(accountReceivables).slice(0, 4).map((order: any) => (
                    <TableRow key={order.account_receivable_id}>
                      <TableCell>{order.account_receivable_id}</TableCell>
                      <TableCell>{order.payable_date.substring(0, 10)}</TableCell>
                      <TableCell>{"$" + order.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
              }
            </TableBody>
          </Table>
        </CardContent>
        <CardActions className={classes.seeMore}>
          <Button href="/accountReceivable" size="medium" style={{color: "white"}}>SEE MORE</Button>
        </CardActions>
      </Card>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    account: state.account.account
  };
};

export default connect(mapStateToProps)(RecentReceivableTransactions);