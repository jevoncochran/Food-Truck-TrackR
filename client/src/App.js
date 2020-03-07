import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import './App.css';

import Login from "./components/Login";
import Register from "./components/Register";
import { PrivateRoute } from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";

function App(props) {
  console.log(props);
  const dynamicRoute = `/api/vendor/${props.accountId}`

  return (
    <Router>
      <div className="App">
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute path={dynamicRoute} component={Dashboard} />
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
