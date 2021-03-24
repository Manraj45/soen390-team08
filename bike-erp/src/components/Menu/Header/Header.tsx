// DEPENDENCIES
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// SERVICES
import { logout } from "../../../redux/actions/AccountActions/accountAction";

// STYLING
import { Box, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useStyles from "./HeaderStyles";
import "./HeaderStyles.ts";

/*
  Horizontal menu on top the page.
  Contains the sidebar menu toggle and the logout option.
*/

const Header = ({ setMenuIsOpen, menuIsOpen, logout, account }: any) => {

  const styles = useStyles();

  const menuToggleClickHandler = () => { setMenuIsOpen(!menuIsOpen) }

  const closeMenuLogout = () => {
    logout();
    setMenuIsOpen(false);
  }

  return (
    <Box className={styles.navbar}>
      <nav className={styles.navbar_Navigation}>
        <Box className={styles.menuIcon}>
          {
            menuIsOpen
            ? <MenuOpenIcon onClick={() => { menuToggleClickHandler() }}/>
            : <MenuIcon onClick={() => { menuToggleClickHandler() }}/>
          }
        </Box>
        <Box>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography className={styles.logo}>Bike King</Typography>
          </Link>
        </Box>
        <Box className={styles.logoutId}>
          <Typography className={styles.userName}>Welcome, {account.account.firstName}</Typography>
          <ExitToAppIcon className={styles.exitLogo} onClick={() => { closeMenuLogout() }}></ExitToAppIcon>
        </Box>
      </nav>
    </Box>
  );
}

const mapStateToProps = (state: any) => {
  return {
    account: state.account
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
