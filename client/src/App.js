import React from 'react';
import { Reset } from "styled-reset";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import './App.scss';

// components
import Login from "./components/Login";
import RegisterAs from "./components/RegisterAs";
import { PrivateRoute } from "./components/PrivateRoute";
import VendorDash from "./components/VendorDash";
import RegisterVendor from './components/RegisterVendor';
import RegisterDiner from "./components/RegisterDiner";
import DinerDash from './components/DinerDash';
import DineSearch from "./components/DineSearch";
import TruckDetails from "./components/TruckDetails";

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

          <Route exact path="/" render={() => <Redirect  to="/login" />} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={RegisterAs} />
          <Route path="/register/vendor" component={RegisterVendor} />
          <Route path="/register/diner" component={RegisterDiner} />
          <PrivateRoute path='/vendor/:accountId' component={VendorDash} />
          <PrivateRoute path="/diner/:accountId" component={DinerDash} />
          <PrivateRoute path="/dine/search" component={DineSearch} />
          <PrivateRoute path="/trucks/:truckId" component={TruckDetails} />
        </div>
      </div>
    </Router>
  );
}

const mapStateToProps = state => {
  return {
    accountId: state.account.id,
    isLoading: state.isLoading
  }
}

export default connect(mapStateToProps, {})(App);
