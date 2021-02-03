import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    logo: {
        width: "100%"
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
}))

export default useStyles