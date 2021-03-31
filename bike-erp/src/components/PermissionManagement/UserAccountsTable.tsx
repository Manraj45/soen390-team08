// DEPENDENCIES
import axios from "axios";
import { useEffect, useState } from "react";

// SERVICES
import { BACKEND_URL } from "../../core/utils/config";
import PermissionDropdown from "./PermissionDropdown";

// STYLING
import { Button, Table, TableBody, TableRow } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import useStyles from "./UserAccountsTableStyle";

/*
  Table that contains the users' accounts information
*/
const UserAccountsTable = (props) => {

  const styles = useStyles();

  const [data, setData] = useState<any[]>([]);
  const [initialState] = useState(new Map());

  // Fetch the accounts from the database
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

  // Update the roles in the database
  const updateRoles = (event) => {
    event.preventDefault();
    let table: any = document.getElementById("accounts");
    /*eslint-disable */
    for (let i = 1, row: any; (row = table.rows[i]); i++) {
      let userEmail: string = "";
      for (let j = 0, col: any; (col = row.cells[j]); j++) {
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

  // Display the accounts information in a table
  const renderAccountsData = () => {
    return data.map((account: any, key: any) => {
      return (
        <tr key={key}>
          <td className={styles.border}>{account.account_id}</td>
          <td className={styles.border}>{account.first_name}</td>
          <td className={styles.border}>{account.last_name}</td>
          <td id="email" className={styles.border}>
            {account.email}
          </td>
          <td className={styles.border}>{account.organization}</td>
          <td id="permission" className={styles.dropdown}>
            <PermissionDropdown permission={account.role} />
          </td>
        </tr>
      );
    });
  };

  // Render all the headers for the table
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
        <th className={styles.tableHeader} key={index}>
          {title.toUpperCase()}
        </th>
      );
    });
  };

  return (
    <div className="accountsTable">
      <div>
        <Table stickyHeader id="accounts">
          <TableRow> {renderTableHeader()} </TableRow>
          <TableBody>{renderAccountsData()}</TableBody>
        </Table>
      </div>
      <div className={styles.saveBtnContainer}>
        <Button
          className={styles.saveBtn}
          variant="contained"
          color="primary"
          size="large"
          onClick={updateRoles}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default UserAccountsTable;
