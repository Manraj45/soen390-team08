import { Table, TableBody, TableRow } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../core/utils/config";
import PermissionDropdown from "./PermissionDropdown";
import useStyles from "./UserAccountsTableStyle";

const UserAccountsTable = () => {
  const [data, setData] = useState<any[]>([]);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/account_management/admin/accounts`)
      .then((res) => {
        console.log(res.data.accounts);
        setData(res.data.accounts);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  const renderAccountsData = () => {
    return data.map((account, key) => {
      return (
        <tr key={key}>
          <td className={classes.bord}>{account.account_id}</td>
          <td className={classes.bord}>{account.first_name}</td>
          <td className={classes.bord}>{account.last_name}</td>
          <td className={classes.bord}>{account.email}</td>
          <td className={classes.bord}>{account.organization}</td>
          <td className={classes.drop}>
            <PermissionDropdown permission={account.role} />
          </td>
        </tr>
      );
    });
  };

  const renderTableHeader = () => {
    const header = [
      "Account ID",
      "First Name",
      "Last Name",
      "Email",
      "Organization",
      "Role",
    ];
    return header.map((title, index) => {
      return <th className={classes.tableHeader} key={index}>{title.toUpperCase()}</th>;
    });
  };

  return (
    <>
      <div>
        <Table stickyHeader id="accounts">
          <TableRow> {renderTableHeader()} </TableRow>
          <TableBody>{renderAccountsData()}</TableBody>
        </Table>
      </div>
    </>
  );
};

export default UserAccountsTable;
