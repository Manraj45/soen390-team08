import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    alignItems: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "200%",
  },
  background: {
    background: "#f0f0f0",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  tableHead: {
    backgroundColor: "#f15e32",
    padding: "7px",
  },
  tableStyle: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  innerTable: {
    background: "#FFFFFF",
  },
  topRow: {
    fontWeight: "bold",
    color: "white",
    background: "#f15e32",
    minWidth:"150px",
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
}));

export default useStyles;
