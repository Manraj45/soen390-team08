import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  recentPayableTransactions: {
    maxWidth: 350,
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      marginTop: 30,
    },
    marginBottom: 30
  },
  headerCell: {
    paddingTop: 0
  },
  seeMore: {
    backgroundColor: "#f15e32",
  }
}));

export default useStyles;
