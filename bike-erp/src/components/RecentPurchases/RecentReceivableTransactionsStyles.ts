import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  recentReceivableTransactions: {
    maxWidth: 350,
    [theme.breakpoints.down("sm")]: {
      marginTop: "30px",
    }
  },
  headerCell: {
    paddingTop: 0
  },
  seeMore: {
    backgroundColor: "#f15e32",
  }
}));

export default useStyles;
