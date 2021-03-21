import { List, ListItem, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./SideBarMenuStyle";
import { connect } from "react-redux";

/*Drawer on the left side that appears when we open the menu*/

const SideDrawer = ({ account }: any) => {
  const style = useStyles();

  return (
    <nav className={style.drawer}>
      <List>
          <Link to="/orderbike" style={{ textDecoration: "none" }}>
            <ListItem className={style.menuItems}>
              <Typography>Order Bike</Typography>
            </ListItem>
          </Link>
        {(account.account.role === "ADMIN" || account.account.role === "MANAGER" || account.account.role === "EMPLOYEE") ? (
          <Link to="/order" style={{ textDecoration: "none" }}>
            <ListItem className={style.menuItems}>
              <Typography>Order Components</Typography>
            </ListItem>
          </Link>
        ) : (
          <></>
        )}
        {(account.account.role === "ADMIN" || account.account.role === "MANAGER" || account.account.role === "EMPLOYEE") ? (
          <Link to="/inventory" style={{ textDecoration: "none" }}>
            <ListItem className={style.menuItems}>
              <Typography>Inventory</Typography>
            </ListItem>
          </Link>
        ) : (
          <></>
        )}
        {account.account.role === "ADMIN" ? (
          <Link to="/userlogs" style={{ textDecoration: "none" }}>
            <ListItem className={style.menuItems}>
              <Typography>User Logs</Typography>
            </ListItem>
          </Link>
        ) : (
          <></>
        )}
        {account.account.role === "ADMIN" ? (
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <ListItem className={style.menuItems}>
              <Typography>Permissions</Typography>
            </ListItem>
          </Link>
        ) : (
          <></>
        )}
        {
            account.account.role === "ADMIN" || account.account.role === "MANAGER"
            ? (
                <Link to="/accountPayable" style={{ textDecoration: 'none' }}>
                    <ListItem className={style.menuItems}>
                        <Typography>Account Payable</Typography>
                    </ListItem>
                </Link>
            )
            : (<></>)
        }
        {
            <Link to="/accountReceivable" style={{ textDecoration: 'none' }}>
                <ListItem className={style.menuItems}>
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

export default connect(mapStateToProps)(SideDrawer);
