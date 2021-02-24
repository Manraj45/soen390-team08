import axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { isAuthenticated } from '../redux/actions/AccountActions/accountAction';

import LoginPage from '../components/LoginPage/LoginPage'
import RegistrationPage from '../components/RegistrationPage/RegistrationPage';
import Home from '../components/Home/Home';

import IdleTimerContainer from '../components/IdleTimerContainer/IdleTimerContainer';
import Inventory from '../components/inventory';
import localStorageService from '../core/services/LocalStorageService'
import OrderComponent from "../pages/OrderComponent";

import './App.css';

const App = ({ account, isAuthenticated }: any) => {

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      localStorageService.setBearerToken();
    }
    isAuthenticated()
  }, [account.authenticated, isAuthenticated])

  axios.interceptors.response.use(
    (response) => {
      return response; // no need to refresh token if successful
    },
    error => {
      if (error.response.data.message === "invalid_token") {
        const request = error.config;
        delete axios.defaults.headers.common.Authorization;
        delete request.headers.Authorization;
        localStorage.removeItem('access_token');
      } else {
        // error from backend, but not because of invalid token
        return Promise.reject(error);
      }
    })

  return (
    <Router>
      <div className="App">
        <IdleTimerContainer></IdleTimerContainer>
        <Switch>
          <Route exact path="/" render={() => account.authenticated ? <Home></Home> : <Redirect to="/login" />} />
          <Route path="/login" render={() => account.authenticated ? <Redirect to="/" /> : <LoginPage />} />
          <Route path="/register" render={() => account.authenticated ? <Redirect to="/" /> : <RegistrationPage/>} />
          <Route exact path="/order" render={() => account.authenticated ? <OrderComponent></OrderComponent> : <Redirect to="/login" />}/>
          <Route exact path="/inventory" render={() => account.authenticated ? <Inventory></Inventory> : <Redirect to="/login" />}/>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state: any) => {
  return {
    account: state.account
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    isAuthenticated: () => dispatch(isAuthenticated())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);