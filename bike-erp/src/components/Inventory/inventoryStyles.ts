import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
      marginTop: "10px",
      marginBottom: "10px",
      alignItems: "center",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "200%",
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
