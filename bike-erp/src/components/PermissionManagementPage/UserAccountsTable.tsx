import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../core/utils/config";
import PermissionDropdown from "./PermissionDropdown";

const UserAccountsTable = () => {
  const [data, setData] = useState<any[]>([]);

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
          <td>{account.account_id}</td>
          <td>{account.first_name}</td>
          <td>{account.last_name}</td>
          <td>{account.email}</td>
          <td>{account.organization}</td>
          <td>
            {" "}
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
      return <th key={index}>{title.toUpperCase()}</th>;
    });
  };

  return (
    <>
      <div>
        <table id="accounts">
          <tr> {renderTableHeader()} </tr>
          <tbody>{renderAccountsData()}</tbody>
        </table>
      </div>
    </>
  );
};

export default UserAccountsTable;
