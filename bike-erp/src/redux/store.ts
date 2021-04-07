import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

// Create store and apply thunk for API request
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
