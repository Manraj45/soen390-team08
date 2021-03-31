import { combineReducers } from "redux";
import accountReducer from "./reducers/AccountReducers/accountReducer";
import orderListReducer from "./reducers/OrderListReducers/orderListReducer";
import orderBikeReducer from "./reducers/OrderBikeReducer/orderBikeReducer";
<<<<<<< HEAD
=======

>>>>>>> 32d177fa0814c60713fd191212fe1233bcb35664
// The root reducer is the main reducer of our redux store. Put all reducers here.
const rootReducer = combineReducers({
  account: accountReducer,
  orderList: orderListReducer,
  bikeOrderList: orderBikeReducer,
});

export default rootReducer;
