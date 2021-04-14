import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  inventorySummary: {
    maxWidth: 500,
    height: "100%",
    boxSizing: "border-box"
  },
  headerCell: {
    paddingTop: 0
  },
  charts: {
    display: "flex",
    flexWrap: "wrap"
  },
  seeMore: {
    backgroundColor: "black"
  }
}));

export default useStyles;
