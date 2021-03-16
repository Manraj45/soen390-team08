import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  adminPageWrapper: {
    [theme.breakpoints.down("sm")]: {
      margin: "0",
      top: "10%",
    },
    [theme.breakpoints.up("md")]: {
      margin: "0",
      top: "30%",
    },
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "50px",
      marginBottom: "50px",
      alignItems: "flex-start",
      textAlign: "left",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "10px",
      marginBottom: "10px",
      alignItems: "flex-start",
      textAlign: "left",
    },
  },
  name: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
      alignItems: "flex-end",
      textAlign: "right",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "10px",
      alignItems: "flex-end",
      textAlign: "right",
    },
  },
  avatarName: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      float: "right",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      float: "right",
    },
  },
  place: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "50px",
      maxHeight: "50px",
      maxWeidth: "50px",
      minHeight: "400px",
      overflow: "auto",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "10px",
      maxHeight: "50px",
      maxWeidth: "50px",
      minHeight: "600px",
      overflow: "auto",
    },
  },
  grid: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "50px",
      float: "right",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "10px",
      float: "right",
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
