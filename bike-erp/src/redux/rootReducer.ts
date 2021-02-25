import { combineReducers } from "redux";
import accountReducer from "./reducers/AccountReducers/accountReducer";

const rootReducer = combineReducers({
    account: accountReducer
})

export default rootReducer