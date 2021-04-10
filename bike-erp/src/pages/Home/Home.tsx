// DEPENDENCIES
import { connect } from "react-redux";
import { logout } from "../../redux/actions/AccountActions/accountAction";

// SERVICES
import Triggers from "../../components/Triggers/Triggers";
import RecentPayableTransactions from "../../components/RecentPurchases/RecentPayableTransactions";
import RecentReceivableTransactions from "../../components/RecentPurchases/RecentReceivableTransactions";

// STYLING
import useStyles from "./HomeStyles";
import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import { BACKEND_URL } from "../../core/utils/config";
import { useEffect, useState } from "react";

/*
  The homepage.
*/
const Home = (props: any) => {
  const classes = useStyles();
  const [montrealInventory, setMontrealInventory] = useState<any[]>([]);
  const [torontoInventory, setTorontoInventory] = useState<any[]>([]);
  const [ottawaInventory, setOttawaInventory] = useState<any[]>([]);

  useEffect(() => {
    axios.all([
      axios.get(`${BACKEND_URL}/components/componentByLocation`, {params: {location: "MONTREAL"}}),
      axios.get(`${BACKEND_URL}/components/componentByLocation`, {params: {location: "TORONTO"}}),
      axios.get(`${BACKEND_URL}/components/componentByLocation`, {params: {location: "OTTAWA"}}),
    ]).then(axios.spread((res1, res2, res3) => {
      setMontrealInventory(res1.data)
      setTorontoInventory(res2.data)
      setOttawaInventory(res3.data)
    }));
  }, []);
  return (
    <div className={classes.home}>
      <Typography variant="h1">Welcome</Typography>
      <div className={classes.content}>
        <Triggers/>
        <RecentPayableTransactions/>
        <RecentReceivableTransactions/>
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
