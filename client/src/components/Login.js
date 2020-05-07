import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import truckPic from "../assets/twt-food-truck-vendor.jpg";
import ScrollAnimation from "react-animate-on-scroll";
import Loader from "react-loader-spinner";
import "../styling/Login.scss";

import { loginAndGetVendor, loginAndGetDiner, getAllTrucks } from "../actions";

import Nav from "./Nav";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [accountType, setAccountType] = useState("vendor");

  const [initialMode, setInitialMode] = useState(true);

  useEffect(() => {
    if (props.accountId !== undefined && !props.isLoading && !initialMode) {
      if (accountType === "vendor") {
        props.history.push(`/vendor/${props.accountId}`);
      } else if (accountType === "diner") {
        props.history.push(`/diner/${props.accountId}`);
      }
    }
  }, [props.accountId, initialMode]);

  const handleLoginChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  const submitVendor = (e) => {
    e.preventDefault();
    props.loginAndGetVendor(credentials);
    setInitialMode(false);
    e.target.reset();
  };

  const submitDiner = (e) => {
    e.preventDefault();
    props.loginAndGetDiner(credentials);
    setInitialMode(false);
    e.target.reset();
  };

  console.log(accountType);

  return (
    <div className="login-con">
      <Nav />
      <div className="main-div">
        <div className="form-div">
          <h2 className="form-heading">Welcome Back</h2>

          <form
            className="login-form"
            onSubmit={accountType === "vendor" ? submitVendor : submitDiner}
          >
            <input
              className="form-input"
              type="text"
              name="username"
              value={credentials.username}
              placeholder="Enter username"
              onChange={handleLoginChange}
            />
            <input
              className="form-input"
              type="password"
              name="password"
              value={credentials.password}
              placeholder="Enter password"
              onChange={handleLoginChange}
            />

            <select className="form-control select" onChange={handleTypeChange}>
              <option disabled value="initial">
                Account Type
              </option>
              <option value="vendor">Vendor</option>
              <option value="diner">Diner</option>
            </select>
            <button type="submit">Login</button>
            <p>Don't have an account?</p>
            <a href="/register">
              <p>Sign up!</p>
            </a>
          </form>
        </div>

        <ScrollAnimation animateIn="fadeIn" className="img-div">
          <img src={truckPic} alt="food truck" />
        </ScrollAnimation>
        {props.isLoading && (
          <Loader
            className="login-loader"
            type="ThreeDots"
            color="#somecolor"
            height={80}
            width={80}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    accountId: state.account.id,
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, {
  loginAndGetVendor,
  loginAndGetDiner,
  getAllTrucks,
})(Login);
