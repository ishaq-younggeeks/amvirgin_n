import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./Store/reducers";
import { ConnectedRouter } from "connected-react-router";
import AppRoutes from "./App";
import history from "./utils/history";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const createStoreWithMiddleware = composeWithDevTools(
  applyMiddleware(thunk)
  // other store enhancers if any
)(createStore);
const MOUNT_ROOT = document.getElementById("root");

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <ConnectedRouter history={history}>
      <AppRoutes />
    </ConnectedRouter>
  </Provider>,
  MOUNT_ROOT
);
registerServiceWorker();
