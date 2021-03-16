import { Button, Table, TableBody, TableRow } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../core/utils/config";
import PermissionDropdown from "./PermissionDropdown";
import useStyles from "./UserAccountsTableStyle";

//Table that contains the users' accounts information
const UserAccountsTable = (props) => {
  const [data, setData] = useState<any[]>([]);
  const [initialState] = useState(new Map());
  const classes = useStyles();

  //fetch the accounts from the database
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/account_management/admin/accounts`)
      .then((res) => {
        setData(res.data.accounts);
        res.data.accounts.forEach((account: any) => {
          initialState.set(account.email, account.role);
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [initialState]);

  //update the roles in the database
  const updateRoles = (event) => {
    event.preventDefault();
    var table: any = document.getElementById("accounts");
    /*eslint-disable */
    for (var i = 1, row: any; (row = table.rows[i]); i++) {
      let userEmail: String = "";
      for (var j = 0, col: any; (col = row.cells[j]); j++) {
        if (col.id === "email") {
          userEmail = col.innerText;
        }
        if (col.id === "permission") {
          let userPermission = col.innerText;
          if (initialState.get(userEmail) !== userPermission) {
            axios
              .patch(`${BACKEND_URL}/account_management/admin/update`, {
                email: userEmail,
                role: userPermission,
              })
              .then((res) => {
                initialState.set(userEmail, userPermission);
              })
              .catch((err) => {
                alert(err.response.data.message);
              });
          }
        }
      }
    }
    /*eslint-enable */
    props.setDialogOpen(true);
  };

  //display the accounts information in a table
  const renderAccountsData = () => {
    return data.map((account: any, key: any) => {
      return (
        <tr key={key}>
          <td className={classes.bord}>{account.account_id}</td>
          <td className={classes.bord}>{account.first_name}</td>
          <td className={classes.bord}>{account.last_name}</td>
          <td id="email" className={classes.bord}>
            {account.email}
          </td>
          <td className={classes.bord}>{account.organization}</td>
          <td id="permission" className={classes.drop}>
            <PermissionDropdown permission={account.role} />
          </td>
        </tr>
      );
    });
  };

  //render all the headers for the table
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
      return (
        <th className={classes.tableHeader} key={index}>
          {title.toUpperCase()}
        </th>
      );
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
      <div className={classes.saveBtnContainer}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.saveBtn}
          onClick={updateRoles}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default UserAccountsTable;
