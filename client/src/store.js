import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// import { Store } from "tough-cookie";
import rootReducer from "../src/reducers";

const intialState = {};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
