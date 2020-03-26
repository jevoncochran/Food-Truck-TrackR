import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const DinerFooter = props => {
    return (
        <footer className="diner-footer">
            <nav className="diner-footer-nav">
                <NavLink to={`/diner/${props.accountId}`} className="footer-nav-icon">Home</NavLink>
                <NavLink to="/dine/search" className="footer-nav-icon">Search</NavLink>
                <NavLink to={`/diner/${props.accountId}/orders`} className="footer-nav-icon">Orders</NavLink>
                <NavLink to={`/diner/${props.accountId}/account`} className="footer-nav-icon">Account</NavLink>
            </nav>
        </footer>
    )
}

const mapStateToProps = state => {
    return {
        accountId: state.account.id
    }
}

export default connect (mapStateToProps, {})(DinerFooter);