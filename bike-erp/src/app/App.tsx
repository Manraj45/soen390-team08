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

import LoginPage from "../components/LoginPage/LoginPage";
import RegistrationPage from "../components/RegistrationPage/RegistrationPage";
import Home from "../components/Home/Home";

import IdleTimerContainer from "../components/IdleTimerContainer/IdleTimerContainer";
import Inventory from "../components/Inventory/inventory";
import localStorageService from "../core/services/LocalStorageService";
import OrderComponent from "../pages/OrderComponent";
import OrderBike from "../components/OrderBike/OrderBike"

import "./App.css";
import ERPMenu from "../components/Menu/ERPMenu";
import SideDrawer from '../components/SideDrawer/SideDrawer';
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
            {account.authenticated ? <ERPMenu setMenuIsOpen={setMenuIsOpen} menuIsOpen={menuIsOpen}></ERPMenu> : <></>}
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
                account.loading ? (<></>) :
                  account.authenticated ? <Redirect to="/" /> : <LoginPage />
              }
            />
            <Route
              path="/register"
              render={() =>
                account.loading ? (<></>) :
                  account.authenticated ? <Redirect to="/" /> : <RegistrationPage />
              }
            />

<<<<<<< HEAD
          <Route path="/order" render={() => account.loading ? (<></>) : account.authenticated ? <OrderComponent /> : <Redirect to="/login" />} />
          <Route path="/inventory" render={() => account.loading ? (<></>) : account.authenticated ? <Inventory /> : <Redirect to="login" />} />
          <Route path="/orderbike" render={() => account.loading ? (<></>) : account.authenticated ? <OrderBike /> : <Redirect to="/login" />}/>
          <Route exact path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </div>
=======
            <Route path="/order" render={() => account.loading ? (<></>) : account.authenticated ? <OrderComponent /> : <Redirect to="/login" />} />
            <Route path="/inventory" render={() => account.loading ? (<></>) : account.authenticated ? <Inventory /> : <Redirect to="login" />} />
            <Route path="/orderbike" render={() => account.loading ? (<></>) : account.authenticated ? <OrderBike /> : <Redirect to="/login" />} />
            <Route exact path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </Box>
      </Box>
>>>>>>> development
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
