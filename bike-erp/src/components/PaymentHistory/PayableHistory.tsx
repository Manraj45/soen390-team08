import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { BACKEND_URL } from "../../core/utils/config";

import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import "./PayableHistory.css";

const PayableHistory = ({ account }: any) => {

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
    <div className="payableHistory">
      <h1>Accounts Payable</h1>
      <div className="userDetails" style={{ textAlign: "right", padding: "0px 20px 20px 0px" }}>
        <Typography>{account.firstName + " " + account.lastName}</Typography>
        <Typography variant="caption">{account.email}</Typography>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Table size="small" className="orders">
          <TableHead>
            <TableRow>
              <TableCell>Order number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            Object.values(accountPayables).map((order: any) => (
              <TableRow key={order.account_payable_id}>
                <TableCell>{order.account_payable_id}</TableCell>
                <TableCell>{order.payable_date.substring(0, 10)}</TableCell>
                <TableCell>{"$" +order.total}</TableCell>
                <TableCell>
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
      </div>
      <div>
        <Table size="small" className="orderDetails">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>Order Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Cost</TableCell>
            </TableRow>
            {
              accountSpecifics != {} && Object.values(accountSpecifics).map((item: any) => (
                <TableRow key={item.transaction_id}>
                  <TableCell>{item.component_id}</TableCell>
                  <TableCell>{item.quantity_bought}</TableCell>
                  <TableCell>{"$" + item.cost}</TableCell>
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

export default connect(mapStateToProps)(PayableHistory);