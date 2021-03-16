import "./ERPMenu.css"
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/AccountActions/accountAction";
import { connect } from "react-redux";

import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const ERPMenu = ({ setMenuIsOpen, menuIsOpen, logout, account }: any) => {

    const menuToggleClickHandler = () => {
        if (menuIsOpen) {
            setMenuIsOpen(false)
        }
        else {
            setMenuIsOpen(true)
        }
    }

    const closeMenuLogout = () => {
        logout();
        setMenuIsOpen(false)
    }

    return (

        <Box className="navbar">
            <nav className="navbar_Navigation">
                <Box className="menuIcon">
                    {menuIsOpen ? <></> : <MenuIcon onClick={() => { menuToggleClickHandler() }}></MenuIcon>}
                    {menuIsOpen ? <MenuOpenIcon onClick={() => { menuToggleClickHandler() }}></MenuOpenIcon> : <></>}
                </Box>
                <Box>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Typography className="logo">Bike King</Typography>
                    </Link>
                </Box>
                <Box className="logoutId">
                    <Typography className="userName">Welcome, {account.account.firstName}</Typography>
                    <ExitToAppIcon className="exitLogo" onClick={() => { closeMenuLogout() }}></ExitToAppIcon>
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
