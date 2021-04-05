// DEPENDENCIES
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// STYLING
import { List, ListItem, Typography } from "@material-ui/core";
import useStyles from "./SideBarMenuStyle";

/*
  Sidebar navigation menu.
*/

const SideBarMenu = ({ account }: any) => {

  const styles = useStyles();

  return (
    <nav className={styles.drawer}>
      <List>
          <Link to="/orderbike" style={{ textDecoration: "none" }}>
            <ListItem className={styles.menuItems}>
              <Typography>Order Bike</Typography>
            </ListItem>
          </Link>
        {
          (account.account.role === "ADMIN" || account.account.role === "MANAGER" || account.account.role === "EMPLOYEE")
          && <Link to="/order" style={{ textDecoration: "none" }}>
              <ListItem className={styles.menuItems}>
                <Typography>Order Components</Typography>
              </ListItem>
            </Link>
        }
        {
          (account.account.role === "ADMIN" || account.account.role === "MANAGER" || account.account.role === "EMPLOYEE")
          && <Link to="/inventory" style={{ textDecoration: "none" }}>
              <ListItem className={styles.menuItems}>
                <Typography>Inventory</Typography>
              </ListItem>
            </Link>
        }
        {
          account.account.role === "ADMIN"
          && <Link to="/userlogs" style={{ textDecoration: "none" }}>
              <ListItem className={styles.menuItems}>
                <Typography>User Logs</Typography>
              </ListItem>
            </Link>
        }
        {
          account.account.role === "ADMIN"
          && <Link to="/admin" style={{ textDecoration: "none" }}>
              <ListItem className={styles.menuItems}>
                <Typography>Permissions</Typography>
              </ListItem>
            </Link>
        }
        {
          (account.account.role === "ADMIN" || account.account.role === "MANAGER" || account.account.role === "EMPLOYEE")
          && <Link to="/accountPayable" style={{ textDecoration: 'none' }}>
              <ListItem className={styles.menuItems}>
                <Typography>Account Payable</Typography>
              </ListItem>
            </Link>
        }
        {
          <Link to="/accountReceivable" style={{ textDecoration: 'none' }}>
            <ListItem className={styles.menuItems}>
              <Typography>Account Receivable</Typography>
            </ListItem>
          </Link>
        }
      </List>
    </nav>
  );
};

const mapStateToProps = (state: any) => {
  return {
    account: state.account,
  };
};

export default connect(mapStateToProps)(SideBarMenu);
