import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bikeBilling: {
    padding: 10,
    minHeight: 750,
    position: "relative"
  },
  contents: {
    overflowY: "auto",
    minHeight: 650
  },
  billingBox: {
    margin: 20,
  },
  total: {
    display: "flex",
    paddingTop: 50,
    position: "absolute",
    bottom: 0
  },
  item: {
    float:"left",
    left:0,
    color: "red",
  }
}));

export default useStyles;