import axios from "axios";
import localStorageService from "../../../core/services/LocalStorageService";
import { AUTH_URL } from "../../../core/utils/config";
import {
  IS_AUTHENTICATED_FAILURE,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../../types/AccountTypes/accountTypes";

// Redux action for Account. Handles the dispatch phase of redux
const url = AUTH_URL;

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
    authenticated: true,
  };
};

export const loginFailure = (error: any) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
    authenticated: false,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT,
    authenticated: false,
  };
};

export const isAuthenticatedFailure = () => {
  return {
    type: IS_AUTHENTICATED_FAILURE,
    authenticated: false,
  };
};

export interface credential {
  email: string;
  password: string;
}

export const login = (credential: credential) => {
  return (dispatch: any) => {
    dispatch(loginRequest);
    axios
      .post(`${url}/auth/login`, credential)
      .then((response) => {
        localStorageService.setToken(response.data);
        localStorageService.setBearerToken();
        dispatch(loginSuccess());
      })
      .catch((error) => {
        const errorMsg = error.response.data;
        dispatch(loginFailure(errorMsg));
      });
  };
};

export const isAuthenticated = () => {
  return (dispatch: any) => {
    dispatch(loginRequest);
    axios
      .get(`${url}/auth/token/validation`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(loginSuccess());
        }
      })
      .catch(() => {
        dispatch(isAuthenticatedFailure());
      });
  };
};

export const logout = () => {
  return (dispatch: any) => {
    axios.delete(`${url}/auth/logout`).then(() => {
      localStorageService.clearAllTokens();
      delete axios.defaults.headers.common.Authorization;
      dispatch(logoutSuccess());
    });
  };
};
