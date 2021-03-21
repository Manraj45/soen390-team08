import "./HeaderMenuStyle.ts"
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import { logout } from "../../../redux/actions/AccountActions/accountAction";
import { connect } from "react-redux";

import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import useStyles from "./HeaderMenuStyle";

/* Menu bar on top the page */

const ERPMenu = ({ setMenuIsOpen, menuIsOpen, logout, account }: any) => {

    const style = useStyles();

    const menuToggleClickHandler = () => {
        if (menuIsOpen) {
            setMenuIsOpen(false);
        }
        else {
            setMenuIsOpen(true);
        }
    }

    const closeMenuLogout = () => {
        logout();
        setMenuIsOpen(false);
    }

    return (

        <Box className={style.navbar}>
            <nav className={style.navbar_Navigation}>
                <Box className={style.menuIcon}>
                    {menuIsOpen ? <></> : <MenuIcon onClick={() => { menuToggleClickHandler() }}></MenuIcon>}
                    {menuIsOpen ? <MenuOpenIcon onClick={() => { menuToggleClickHandler() }}></MenuOpenIcon> : <></>}
                </Box>
                <Box>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Typography className={style.logo}>Bike King</Typography>
                    </Link>
                </Box>
                <Box className={style.logoutId}>
                    <Typography className={style.userName}>Welcome, {account.account.firstName}</Typography>
                    <ExitToAppIcon className={style.exitLogo} onClick={() => { closeMenuLogout() }}></ExitToAppIcon>
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

export default connect(mapStateToProps, mapDispatchToProps)(ERPMenu);
