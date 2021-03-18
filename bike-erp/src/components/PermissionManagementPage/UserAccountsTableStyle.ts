import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    backgroundColor: "black",
    color: "white",
    padding: "7px",
  },
  bord: {
    borderBottom: "1px solid grey",
  },
  drop: {
    borderBottom: "1px solid grey",
    paddingBottom: "10px",
  },
  saveBtn: {
    margin: theme.spacing(1),
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "#343835",
    },
  },
  saveBtnContainer: {
    float: "right",
    padding: "10px",
  },
}));

export default useStyles;
