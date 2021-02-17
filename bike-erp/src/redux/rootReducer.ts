import { combineReducers } from "redux";
import accountReducer from "./reducers/AccountReducers/accountReducer";

// The root reducer is the main reducer of our redux store. Put all reducers here.
const rootReducer = combineReducers({
    account: accountReducer
})

export default rootReducer