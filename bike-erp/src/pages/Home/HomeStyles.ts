import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  home: {
    width: "100%",
    height: "100%"
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  }
}));

export default useStyles;
