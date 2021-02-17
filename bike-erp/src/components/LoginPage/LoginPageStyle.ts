import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    logo: {
        width: "100%"
    },
    loginPageWrapper: {
        [theme.breakpoints.down('sm')]: {
            margin: "0",
            position: "absolute",
            top: "10%"
        },
        [theme.breakpoints.up('md')]: {
            margin: "0",
            position: "absolute",
            top: "30%"
        }
    },
    textfield: {
        width: "80%",
        height: "100%",
        marginBottom: "10px"
    },
    grid: {
        [theme.breakpoints.down('sm')]: {
            marginTop: "50px"
        },
        [theme.breakpoints.up('md')]: {
            marginTop: "10px"
        }
    },
    button: {
        width: "80%",
        marginTop: "10px"
    },
    login: {
        marginTop: "10%"
    },
    register: {
        [theme.breakpoints.down('sm')]: {
            marginTop: "20px",
            marginBottom: "30px"
        },
        [theme.breakpoints.up('md')]: {
            marginTop: "20%"
        },
    },
    error: {
        color: "red"
    }
}))

export default useStyles