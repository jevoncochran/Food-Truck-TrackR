import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { axiosWithAuth } from "../utils/axiosWithAuth";

import { clientSignOut } from "../actions";

const VendorDash = props => {
    console.log(props.match.params.accountId);
    const [accountInfo, setAccountInfo] = useState({});
    // const match = props.match.params.accountId;

    useEffect(() => {
        // if (props.id === undefined) {
        //     props.getAccountOnRefresh(match);
        // } else {
            axiosWithAuth()
                .get(`/operator/${props.id}`)
                .then(res => {
                    // console.log(res);
                    setAccountInfo(res.data);
                })
                .catch(err => console.log(err))
        // }
    }, [props.id])

    const logout = e => {
        e.preventDefault();
        props.clientSignOut();
        props.history.push('/login');
    }

    return (
        <div>
            <h1>This is the Dashboard component</h1>
            <h2>Welcome, {accountInfo.username}</h2>
            <h3>Your Trucks</h3>
            {accountInfo.trucks && accountInfo.trucks.map(truck => (
                <div key={truck.id}>
                    <p>{truck.name}</p>
                    <p>{truck.cuisine_type}</p>
                    <p>{truck.physical_address}</p>
                    <br/>
                </div>
            ))}
            <button onClick={logout}>Logout</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        id: state.account.id,
        username: state.account.username,
        email: state.account.email
    }
}

export default connect(mapStateToProps, { clientSignOut })(VendorDash);