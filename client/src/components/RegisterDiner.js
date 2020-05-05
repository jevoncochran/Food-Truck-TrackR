import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { registerDiner } from "../actions";

import Nav from "./Nav";

const RegisterDiner = (props) => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChanges = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const submitRegister = (e) => {
    e.preventDefault();
    props.registerDiner(credentials);
    e.target.reset();
    props.history.push("/login");
  };

  return (
    <div className="register-container">
      <Nav />

      <form className="signup-form" onSubmit={submitRegister}>
        <h3 className="cta">Let's get started</h3>
        <label className="signup-labels">Register username (required)</label>
        <input
          className="signup-inputs"
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChanges}
        />
        <label className="signup-labels">Register email (required)</label>
        <input
          className="signup-inputs"
          type="text"
          name="email"
          value={credentials.email}
          onChange={handleChanges}
        />
        <label className="signup-labels">Register password (required)</label>
        <input
          className="signup-inputs"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChanges}
        />
        <button className="signup-submit" type="submit">
          Submit
        </button>
        <p className="acct-already">
          Already have an account?{" "}
          <span className="signin-span">
            <NavLink to="/">Sign in</NavLink>
          </span>
        </p>
      </form>
    </div>
  );
};

export default connect(null, { registerDiner })(RegisterDiner);
