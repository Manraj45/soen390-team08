import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import LoginPage from '../components/LoginPage/LoginPage'
import axios from 'axios';
import localStorageService from '../core/services/LocalStorageService'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import RegistrationPage from '../components/RegistrationPage/RegistrationPage';
import Home from '../components/Home/Home';
import { isAuthenticated } from '../redux/actions/AccountActions/accountAction';

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
        <Switch>
          <Route exact path="/" render={() => account.authenticated ? <Home></Home> : <Redirect to="/login" />} />
          <Route path="/login" render={() => account.authenticated ? <Redirect to="/" /> : <LoginPage />} />
          <Route path="/register" render={() => account.authenticated ? <Redirect to="/" /> : <RegistrationPage></RegistrationPage>} />
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