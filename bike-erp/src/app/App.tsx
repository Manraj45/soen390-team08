import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { isAuthenticated } from "../redux/actions/AccountActions/accountAction";

import LoginPage from "../pages/Login/LoginPage";
import RegistrationPage from "../pages/Registration/Registration";
import PermissionManagement from "../pages/PermissionManagement/PermissionManagement";
import Home from "../pages/Home/Home";
import IdleTimerContainer from "../components/IdleTimerContainer/IdleTimerContainer";
import Inventory from "../pages/Inventory/inventory";
import localStorageService from "../core/services/LocalStorageService";
import OrderComponent from "../pages/OrderService/OrderComponent/OrderComponent";
import OrderBike from "../pages/OrderService/OrderBike/OrderBike";
import UserLogs from "../pages/UserLogs/UserLogs";
import PayableHistory from "../pages/PaymentHistory/PayableHistory";
import ReceivableHistory from "../pages/PaymentHistory/ReceivableHistory";

import "./App.css";
import ERPMenu from "../components/Menu/HeaderMenu/HeaderMenu";
import SideDrawer from "../components/Menu/SideBarMenu/SideBarMenu";
import { Box } from "@material-ui/core";

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
        // error from backend, but not because of invalid token
        return Promise.reject(error);
      }
    }
  );

  return (
    <Router>
      <Box>
        <Box className="App">
          <Box>
            {account.authenticated ? (
              <ERPMenu
                setMenuIsOpen={setMenuIsOpen}
                menuIsOpen={menuIsOpen}
              ></ERPMenu>
            ) : (
              <></>
            )}
            {menuIsOpen ? <SideDrawer></SideDrawer> : <></>}
          </Box>
          <IdleTimerContainer></IdleTimerContainer>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                account.authenticated ? <Home></Home> : <Redirect to="/login" />
              }
            />
            <Route
              path="/login"
              render={() =>
                account.loading ? (
                  <></>
                ) : account.authenticated ? (
                  <Redirect to="/" />
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route
              path="/register"
              render={() =>
                account.loading ? (
                  <></>
                ) : account.authenticated ? (
                  <Redirect to="/" />
                ) : (
                  <RegistrationPage />
                )
              }
            />
            <Route
              path="/admin"
              render={() =>
                account.loading ? (
                  <></>
                ) : account.authenticated &&
                  account.account.role === "ADMIN" ? (
                  <PermissionManagement />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />

            <Route
              path="/order"
              render={() =>
                account.loading ? (
                  <></>
                ) : account.authenticated &&
                (account.account.role === "ADMIN" ||
                account.account.role === "MANAGER" || 
                account.account.role === "EMPLOYEE")? (
                  <OrderComponent />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/inventory"
              render={() =>
                account.loading ? (
                  <></>
                ) : account.authenticated &&
                (account.account.role === "ADMIN" ||
                account.account.role === "MANAGER" || 
                account.account.role === "EMPLOYEE") ? (
                  <Inventory />
                ) : (
                  <Redirect to="login" />
                )
              }
            />
            <Route
              path="/orderbike"
              render={() =>
                account.loading ? (
                  <></>
                ) : account.authenticated ? (
                  <OrderBike />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/userlogs"
              render={() =>
                account.loading ? (
                  <></>
                ) : account.authenticated &&
                  account.account.role === "ADMIN" ? (
                  <UserLogs />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/accountPayable"
              render={() => account.loading
                ? (<></>)
                : account.authenticated
                  ? <PayableHistory />
                  : <Redirect to="/login"/>
              }
            />
            <Route path="/accountReceivable" render={() => account.loading ? (<></>) : account.authenticated ? <ReceivableHistory /> : <Redirect to="/login" />} />
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
