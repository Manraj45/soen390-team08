/* .navbar {
    position:fixed;
    width:100%;
    background: rgba(0, 0, 0, 0.95);
    height: 40px;
    top: 0;
    left : 0;
    z-index: 200;
}

.menuIcon {
    display: flex;
    color: white;
    padding-left: 10px;
}

.navbar_Navigation {
    display: flex;
    align-items: center;
    height: 100%;
}

.logo {
    color:white;
    padding-left: 25px;
}

.exitLogo {
    color: white;
    padding-right: 20px;
}

.userName{
    color:white;
    padding-right: 20px;
}

.logoutId{
    right : 0;
    position: absolute;
    display: flex;
} */

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    navbar: {
        position: "fixed",
        background: "rgba(0, 0, 0, 0.95)",
        top: 0,
        height: "40px",
        width: "100%",
        zIndex: 200,
        left: 0
    },
    menuIcon: {
        display: "flex",
        color: "white",
        paddingLeft: "10px"
    },
    navbar_Navigation: {
        display: "flex",
        alignItems: "center",
        height: "100%"
    },
    logo: {
        color: "white",
        paddingLeft: "25px"
    },
    exitLogo: {
        color: "white",
        paddingRight: "20px"
    },
    userName: {
        color: "white",
        paddingRight: "20px"
    },
    logoutId: {
        right: 0,
        position: "absolute",
        display: "flex"
    }
}));

export default useStyles;
