import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import { truckReducer } from "./reducers/truck-reducer";

// set up to persist redux state on refresh
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, truckReducer);

// async middleware (thunk) and logger has to go here
let store = createStore(persistedReducer, applyMiddleware(thunk, logger));

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    {/* wrap component in PersistGate for redux persist to take effect */}
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
