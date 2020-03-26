import React, { useState } from "react";
import { connect } from "react-redux";

import { registerDiner } from "../actions";

import Nav from "./Nav";

const RegisterDiner = props => {
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: '',
        location: ''
    })

    const handleChanges = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const submitRegister = e => {
        e.preventDefault();
        props.registerDiner(credentials);
        e.target.reset();
        props.history.push('/login');
    }

    return (
        <div>
            <Nav />
            <form onSubmit={submitRegister}>
                <input type="text" name="username" value={credentials.username} placeholder="Enter username" onChange={handleChanges} />
                <input type="text" name="email" value={credentials.email} placeholder="Enter email" onChange={handleChanges} />
                <input type="password" name="password" value={credentials.password} placeholder="Enter password" onChange={handleChanges} />
                <input type="text" name="location" value={credentials.location} placeholder="Enter location" onChange={handleChanges} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default connect(null, { registerDiner })(RegisterDiner);