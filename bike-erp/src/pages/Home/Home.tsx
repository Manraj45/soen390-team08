// DEPENDENCIES
import { connect } from "react-redux";
import { logout } from "../../redux/actions/AccountActions/accountAction";

// SERVICES
import Triggers from "../../components/Triggers/Triggers";
import RecentPayableTransactions from "../../components/RecentPurchases/RecentPayableTransactions";
import RecentReceivableTransactions from "../../components/RecentPurchases/RecentReceivableTransactions";
import InventorySummary from "../../components/Inventory/InventorySummary";

// STYLING
import useStyles from "./HomeStyles";
import { Typography } from "@material-ui/core";

/*
  The homepage.
*/
const Home = (props: any) => {
  const classes = useStyles();

  return (
    <div className={classes.home}>
      <Typography variant="h1">Welcome</Typography>
      <div className={classes.content}>
        <Triggers/>
        <RecentPayableTransactions/>
        <RecentReceivableTransactions/>
        <InventorySummary/>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    account: state.account,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => dispatch(logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
