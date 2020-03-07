import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { loginAndGetAccount } from "../actions";

const Login = props => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        if(props.accountId !== undefined && !props.isLoading) {
          props.history.push(`/api/vendor/${props.accountId}`);
        }
      }, [props.accountId])

    const handleChanges = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const submitLogin = e => {
        e.preventDefault();
        props.loginAndGetAccount(credentials);
        e.target.reset();
    }

    return (
        <form onSubmit={submitLogin}>
            <input type="text" name="username" value={credentials.username} placeholder="Enter username" onChange={handleChanges} />
            <input type="password" name="password" value={credentials.password} placeholder="Enter password" onChange={handleChanges} />
            <button type="submit">Submit</button>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        accountId: state.account.id
    }
}

export default connect(mapStateToProps, { loginAndGetAccount })(Login);