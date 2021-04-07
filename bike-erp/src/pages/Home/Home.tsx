// DEPENDENCIES
import { connect } from "react-redux";
import { logout } from "../../redux/actions/AccountActions/accountAction";

// SERVICES
import RecentPayableTransactions from "../../components/RecentPurchases/RecentPayableTransactions";
import RecentReceivableTransactions from "../../components/RecentPurchases/RecentReceivableTransactions";

// STYLING
import { Button, Typography } from "@material-ui/core";

/*
  The homepage.
*/
const Home = (props: any) => {
  return (
    <div>
      <Typography variant="h1">Welcome</Typography>
      <div className="recentTransactions" style={{ display: "flex", maxWidth: 800, justifyContent: "space-evenly" }}>
        <RecentPayableTransactions />
        <RecentReceivableTransactions />
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
