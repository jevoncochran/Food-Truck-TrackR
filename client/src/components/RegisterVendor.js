import React, { useState } from "react";
import { connect } from "react-redux";
import "../styling/RegisterVendor.scss";

import { registerVendor } from "../actions";

import Nav from "./Nav";

const RegisterVendor = props => {
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
        props.registerVendor(credentials);
        e.target.reset();
        props.history.push('/login');
    }

    return (
        <div className="main-div">
            <Nav />
        
            <form onSubmit={submitRegister}>
                <input type="text" name="username" value={credentials.username} placeholder="Enter username" onChange={handleChanges} />
                <input type="text" name="email" value={credentials.email} placeholder="Enter email" onChange={handleChanges} />
                <input type="password" name="password" value={credentials.password} placeholder="Enter password" onChange={handleChanges} />
                {/* <select name="role" onChange={handleChanges}>
                    <option>Vendor or Diner?</option>
                    <option value={credentials.role}>Vendor</option>
                    <option value={credentials.role}>Diner</option>
                </select> */}
                <button type="submit">Submit</button>
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