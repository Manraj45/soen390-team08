import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

// Create store and apply thunk for API request
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
