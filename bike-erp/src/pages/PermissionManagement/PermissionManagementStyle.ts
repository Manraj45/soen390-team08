import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  adminPageWrapper: {
    margin: "0",
    [theme.breakpoints.down("sm")]: {
      top: "10%",
    },
    [theme.breakpoints.up("md")]: {
      top: "30%",
    },
  },
  title: {
    alignItems: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "200%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "50px",
      marginBottom: "50px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "10px",
      marginBottom: "10px",
    },
  },
  place: {
    maxHeight: "50px",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      marginTop: "50px",
      minHeight: "500px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "10px",
      minHeight: "650px",
    },
  },
  grid: {
    float: "right",
    [theme.breakpoints.down("sm")]: {
      marginTop: "50px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "10px",
    },
  },
  button: {
    width: "20%",
    marginTop: "10px",
    alignItems: "flex-end",
  },
  error: {
    color: "red",
  },
}));

export default useStyles;
