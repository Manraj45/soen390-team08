import React, { useEffect, useState } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from '../redux/store';
import LoginPage from '../components/LoginPage/LoginPage'
import axios from 'axios';
import { AUTH_URL } from '../core/utils/config';
import localStorageService from '../core/services/LocalStorageService'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import RegistrationPage from '../components/RegistrationPage/RegistrationPage';
import Home from '../components/Home/Home';

import Inventory from './components/inventory'

function App() {

  const [authenticated, setAuthenticated] = useState(false)
  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      localStorageService.setBearerToken();
    }
    isAuthenticated()
  }, [authenticated])

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

  const isAuthenticated = () => {
    const access_token: any = localStorage.getItem('access_token')
    axios.get(`${AUTH_URL}/auth/token/validation`).then(response => {
      if (response.status === 200) {
        setAuthenticated(true)
        console.log("authenticated")
      }
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="App">
      <Inventory></Inventory>
    </div>
  );
}

export default App;
