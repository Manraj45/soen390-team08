// DEPENDENCIES
import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

// SERVICES
import localStorageService from "../core/services/LocalStorageService";
import { isAuthenticated } from "../redux/actions/AccountActions/accountAction";

// COMPONENTS
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Home from "../pages/Home/Home";
import HeaderMenu from "../components/Menu/Header/Header";
import SideBarMenu from "../components/Menu/SideBarMenu/SideBarMenu";
import IdleTimerContainer from "../components/IdleTimerContainer/IdleTimerContainer";
import PermissionManagement from "../pages/PermissionManagement/PermissionManagement";
import Inventory from "../pages/Inventory/Inventory";
//import OrderComponent from "../pages/OrderService/OrderComponent/OrderComponent";
import OrderComponent from "../pages/OrderComponent/OrderComponent";
import UserLogs from "../pages/UserLogs/UserLogs";
import PayableHistory from "../pages/PaymentHistory/PayableHistory";
import ReceivableHistory from "../pages/PaymentHistory/ReceivableHistory";
//import OrderBike from "../pages/OrderService/OrderBike/OrderBike"
import OrderBike from "../pages/OrderBike/OrderBike"
import CustomComponent from "../pages/CustomComponent/CustomComponent";

// STYLING
import { Box } from "@material-ui/core";
import "./App.css";
  
const App = ({ account, isAuthenticated }: any) => {

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      localStorageService.setBearerToken();
    }
    isAuthenticated();  
  }, [account.authenticated, isAuthenticated, account.loading]);

  axios.interceptors.response.use(
    (response) => {
      return response; // no need to refresh token if successful
    },
    (error) => {
      if (error.response.data.message === "invalid_token") {
        const request = error.config;
        delete axios.defaults.headers.common.Authorization;
        delete request.headers.Authorization;
        localStorage.removeItem("access_token");
      } else {
        return Promise.reject(error); // error from backend, but not because of invalid token
      }
    }
  );

  return (
    <Router>
      <Box>
        <Box className="App">
          <Box>
            {account.authenticated && <HeaderMenu setMenuIsOpen={setMenuIsOpen} menuIsOpen={menuIsOpen} />}
            {menuIsOpen && <SideBarMenu />}
          </Box>
          <IdleTimerContainer />
          <Switch>
            <Route exact path="/" render={() => account.authenticated ? <Home /> : <Redirect to="/login" />} />
            <Route path="/login"
              render={() => account.loading
                ? <></>
                : account.authenticated
                  ? <Redirect to="/" />
                  : <Login />
              }
            />
            <Route path="/register"
              render={() => account.loading
                ? <></>
                : account.authenticated
                  ? <Redirect to="/" />
                  : <Registration />
              }
            />
            <Route path="/admin"
              render={() => account.loading
                ? <></>
                : account.authenticated && account.account.role === "ADMIN"
                  ? <PermissionManagement />
                  : <Redirect to="/login" />
              }
            />
            <Route path="/order"
              render={() => account.loading
                ? <></>
                : account.authenticated
                  && (account.account.role === "ADMIN"
                    || account.account.role === "MANAGER"
                    || account.account.role === "EMPLOYEE")
                  ? <OrderComponent />
                  : <Redirect to="/login" />
              }
            />
            <Route path="/inventory"
              render={() => account.loading
                ? <></>
                : account.authenticated
                  && (account.account.role === "ADMIN"
                    || account.account.role === "MANAGER"
                    || account.account.role === "EMPLOYEE")
                  ? <Inventory />
                  : <Redirect to="login" />
              }
            />
            <Route path="/orderbike"
              render={() => account.loading
                ? <></>
                : account.authenticated
                  ? <OrderBike />
                  : <Redirect to="/login" />
              }
            />
            <Route path="/userlogs"
              render={() => account.loading
                ? <></>
                : account.authenticated && account.account.role === "ADMIN"
                  ? <UserLogs />
                  : <Redirect to="/login" />
              }
            />
            <Route path="/accountPayable"
              render={() => account.loading
                ? <></>
                : account.authenticated
                  ? <PayableHistory />
                  : <Redirect to="/login" />
              }
            />
            <Route path="/accountReceivable"
              render={() => account.loading
                ? <></>
                : account.authenticated
                  ? <ReceivableHistory />
                  : <Redirect to="/login" />
              }
            />
            <Route path="/test" render={() => account.loading
              ? <></>
              : account.authenticated
                ? <OrderBike></OrderBike>
                : <Redirect to="/login" />
            } />
            <Route path="/addComponent"
              render={() => account.loading
                ? <></>
                : account.authenticated
                  && (account.account.role === "ADMIN"
                    || account.account.role === "MANAGER")
                  ? <CustomComponent />
                  : <Redirect to="/login" />
              }
            />
            <Route exact path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </Box>
      </Box>
    </Router>
  );
};

const mapStateToProps = (state: any) => {
  return {
    account: state.account,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    isAuthenticated: () => dispatch(isAuthenticated()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
