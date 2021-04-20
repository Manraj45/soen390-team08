import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  payableHistory: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    maxWidth: "70%",
  },
  userDetails: {
    textAlign: "right",
    paddingTop: 0,
    paddingBottom: 20,
    paddingLeft: 0,
    paddingRight: 20,
  },
  dataContainer: {
    marginBottom: 20,
  },
  orderCell: {
    border: 1,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid"
  },
  export: {
    textAlign:"right"
  },
  tableHeader: {
    backgroundColor: "#f15e32",
    color: "white",
    padding: "7px",
    border: 1,
    borderWidth: 1,
    borderColor: "#f15e32",
    borderStyle: "solid",
  },
  place: {
    maxHeight: "50px",
    maxWeidth: "50px",
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
