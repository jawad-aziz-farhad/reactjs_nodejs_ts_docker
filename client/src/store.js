import { createStore, applyMiddleware, compose } from "redux";
import itemDataReducer from "./reducers";
import thunk from "redux-thunk";

compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)
export default createStore(itemDataReducer,compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));