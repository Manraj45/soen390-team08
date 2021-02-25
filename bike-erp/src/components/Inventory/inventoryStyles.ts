import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Inter",
    fontSize: "64",
  },
  background: {
    background: "#DDDDDD",
  },
  tableHead: {
    background: "#BFBFBF",
  },
  tableStyle: {
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  innerTable: {
    background: "#FFFFFF",
  },
  topRow: {
    fontWeight: "bold",
    fontFamily: "Inter",
  },
  emptyCell: {
    background: "#DDDDDD",
  },
}));

export default useStyles;
