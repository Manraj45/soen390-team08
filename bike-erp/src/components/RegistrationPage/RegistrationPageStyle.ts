import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    logo: {
        width: "90%"
    },
    grid: {
        [theme.breakpoints.down('sm')]: {
            marginTop: "50px"
        },
        [theme.breakpoints.up('md')]: {
            marginTop: "10px"
        }
    },
    registrationPageWrapper: {
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
        width: "60%",
        height: "100%",
        marginBottom: "10px"
    },
    recoveryQuestion: {
        width: "60%",
        height: "100%",
        marginBottom: "10px"
    },
    recoveryLabel: {
        width: "20%",
        marginLeft: "155px"
    },
    firstName: {
        width: "29%",
        marginRight: "5px"
    },
    lastName: {
        width: "30%",
        marginRight: "5px"
    },
    button: {
        width: "60%",
        marginTop: "10px"
    },
    error: {
        color: "red"
    }
}))

export default useStyles