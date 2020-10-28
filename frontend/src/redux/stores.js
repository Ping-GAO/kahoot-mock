import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./reducers/index";
import thunk from "redux-thunk";

// this config enalbe the chrome redux extension
// copy paste from redux offical github page
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
export const store = createStore(rootReducer, enhancer);
