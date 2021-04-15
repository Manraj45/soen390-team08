import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    backgroundColor: "#f15e32",
    color: "white",
    padding: "7px",
  },
  border: {
    borderBottom: "1px solid grey",
  },
  dropdown: {
    borderBottom: "1px solid grey",
    paddingBottom: "10px",
  },
  saveBtn: {
    margin: theme.spacing(1),
    backgroundColor: "#f15e32",
    "&:hover": {
      backgroundColor: "#f15e32",
    },
  },
  saveBtnContainer: {
    float: "right",
    padding: "10px",
  },
}));

export default useStyles;
