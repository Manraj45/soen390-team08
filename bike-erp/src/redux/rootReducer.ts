import { combineReducers } from "redux";
import accountReducer from "./reducers/AccountReducers/accountReducer";
import orderListReducer from "./reducers/OrderListReducers/orderListReducer";
// The root reducer is the main reducer of our redux store. Put all reducers here.
const rootReducer = combineReducers({
  account: accountReducer,
  orderList: orderListReducer,
});

export default rootReducer;
