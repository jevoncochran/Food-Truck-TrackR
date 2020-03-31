import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "../styling/Registration.scss";

import { registerVendor } from "../actions";

import Nav from "./Nav";

const RegisterVendor = props => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        email: '',
    });

    const handleChanges = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const submitRegister = e => {
        e.preventDefault();
        props.registerVendor(credentials);
        e.target.reset();
        props.history.push('/login');
    }

    return (
        <div className="register-container">
            <Nav />
        
            <form className="signup-form" onSubmit={submitRegister}>
                <h3 className="cta">Let's get started</h3>
                <label className="signup-labels">Register username (required)</label>
                <input className="signup-inputs" type="text" name="username" value={credentials.username} onChange={handleChanges} />
                <label className="signup-labels">Register email (required)</label>
                <input className="signup-inputs" type="text" name="email" value={credentials.email} hange={handleChanges} />
                <label className="signup-labels">Register password (required)</label>
                <input className="signup-inputs" type="password" name="password" value={credentials.password} onChange={handleChanges} />
                <button className="signup-submit" type="submit">Submit</button>
                <p className="acct-already">Already have an account? <span className="signin-span"><NavLink to="/">Sign in</NavLink></span></p>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        accountId: state.account.id
    }
}

export default connect(mapStateToProps, { registerVendor })(RegisterVendor);