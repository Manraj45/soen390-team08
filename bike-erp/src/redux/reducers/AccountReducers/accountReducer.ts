import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../../types/AccountTypes/accountTypes"

const initialState = {
    loading: false,
    access_token: undefined,
    error: ''
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                loading: false,
                access_token: action.payload
            }
        case LOGIN_FAILURE:
            return {
                loading: false,
                access_token: undefined,
                error: action.payload
            }
        default: return state
    }
}

export default reducer