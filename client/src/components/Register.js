import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { registerAccount } from "../actions";

const Register = props => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        email: '',
    });

    // useEffect(() => {
    //     if(props.accountId !== undefined && !props.isLoading) {
    //       props.history.push(`/api/vendor/${props.accountId}`);
    //     }
    //   }, [props.accountId])

    const handleChanges = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const submitRegister = e => {
        e.preventDefault();
        props.registerAccount(credentials);
        e.target.reset();
        props.history.push('/login');
    }

    return (
        <form onSubmit={submitRegister}>
            <input type="text" name="username" value={credentials.username} placeholder="Enter username" onChange={handleChanges} />
            <input type="text" name="email" value={credentials.email} placeholder="Enter email" onChange={handleChanges} />
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

export default connect(mapStateToProps, { registerAccount })(Register);