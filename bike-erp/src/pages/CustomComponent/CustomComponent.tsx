// DEPENDENCIES
import { connect } from "react-redux";
import { logout } from "../../redux/actions/AccountActions/accountAction";

// STYLING
import { Button, Typography } from "@material-ui/core";

/*
  Adding user specific component page
*/
const CustomComponent = (props: any) => {
  return (
    <div>
      <Typography variant="h1">Welcome</Typography>
      <Button variant="contained" color="primary" onClick={props.logout}>
        Logout
      </Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(CustomComponent);
