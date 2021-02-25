import axios from "axios"
import { AUTH_URL } from "../../../core/utils/config"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../../types/AccountTypes/accountTypes"
import localStorageService from '../../../core/services/LocalStorageService'

const url = AUTH_URL

export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

export const loginSuccuess = (token: any) => {
    return {
        type: LOGIN_SUCCESS,
        payload: token
    }
}

export const loginFailure = (error: any) => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}

export interface credential {
    email: string
    password: string
}

export const login = (credential: credential) => {
    
    return (dispatch: any) => {
        dispatch(loginRequest)
        axios.post(`${url}/auth/login`, credential).then((response) => {
            const access_token = response.data.accessToken
            localStorageService.setToken(response.data)
            localStorageService.setBearerToken()
            dispatch(loginSuccuess(access_token))
        }).catch(error => {
            const errorMsg = error.response.data
            dispatch(loginFailure(errorMsg))
        })
    }
}