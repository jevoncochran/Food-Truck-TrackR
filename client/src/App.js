import React from "react";
import { Reset } from "styled-reset";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.scss";
import { ToastProvider } from "react-toast-notifications";

// components
import Login from "./components/Login";
import RegisterAs from "./components/RegisterAs";
import { PrivateRoute } from "./components/PrivateRoute";
import VendorDash from "./components/VendorDash";
import RegisterVendor from "./components/RegisterVendor";
import RegisterDiner from "./components/RegisterDiner";
import DinerDash from "./components/DinerDash";
import DineSearch from "./components/DineSearch";
import TruckDetails from "./components/TruckDetails";
import Payment from "./components/Payment";
import Account from "./components/Account";

const GlobalStyle = createGlobalStyle`
`;

function App(props) {
  console.log(props);
  // const dynamicRoute = `/api/vendor/${props.accountId}`

  return (
    <Router>
      <div className="App">
        <div className="inner-div">
          <Reset />
          <GlobalStyle />

          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route
            path="/login"
            render={() => {
              if (props.role === "vendor" && props.isLoading) {
                return <Redirect to={`/vendor/${props.accountId}`} />;
              } else if (props.role === "diner" && props.isLoading) {
                return <Redirect to={`diner/${props.accountId}`} />;
              } else {
                return <Login />;
              }
            }}
          />
          <Route exact path="/register" component={RegisterAs} />
          <Route path="/register/vendor" component={RegisterVendor} />
          <Route path="/register/diner" component={RegisterDiner} />
          <PrivateRoute path="/vendor/:accountId" component={VendorDash} />
          <PrivateRoute exact path="/diner/:accountId" component={DinerDash} />
          <PrivateRoute path="/dine/search" component={DineSearch} />
          <PrivateRoute path="/diner/:accountId/account" component={Account} />
          <ToastProvider>
            <PrivateRoute path="/trucks/:truckId" component={TruckDetails} />
          </ToastProvider>
          <PrivateRoute path="/payment" component={Payment} />
        </div>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    accountId: state.account.id,
    isLoading: state.isLoading,
    role: state.role,
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps, {})(App);
