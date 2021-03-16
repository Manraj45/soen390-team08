import { Button } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../core/utils/config";
import PermissionDropdown from "./PermissionDropdown";

const UserAccountsTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [initialState] = useState(new Map());
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

  const updateRoles = (event) => {
    event.preventDefault();
    var table: any = document.getElementById("accounts");
    var userEmail: String = "";
    for (var i = 1, row: any; (row = table.rows[i]); i++) {
      for (var j = 0, col: any; (col = row.cells[j]); j++) {
        if (col.id === "email") {
          userEmail = col.innerText;
        }
        if (col.id === "permission") {
          var userPermission = col.innerText;
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
  };

  const renderAccountsData = () => {
    return data.map((account: any, key: any) => {
      return (
        <tr key={key}>
          <td>{account.account_id}</td>
          <td>{account.first_name}</td>
          <td>{account.last_name}</td>
          <td id="email">{account.email}</td>
          <td>{account.organization}</td>
          <td id="permission">
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
    return header.map((title: any, index: any) => {
      return <th key={index}>{title.toUpperCase()}</th>;
    });
  };

  return (
    <div>
      <form onSubmit={updateRoles}>
        <div>
          <table id="accounts">
            <tr> {renderTableHeader()} </tr>
            <tbody>{renderAccountsData()}</tbody>
          </table>
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserAccountsTable;
