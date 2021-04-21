import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      marginTop: 30,
      maxWidth: 350
    },
    marginBottom: 30,
  },
  headerCell: {
    paddingTop: 0
  },
  seeMore: {
    backgroundColor: "#f15e32",
  }
}));

export default useStyles;
