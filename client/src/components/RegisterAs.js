import React from "react";
import { Link } from "react-router-dom";
import "../styling/RegisterAs.scss";
import chefImg from "../assets/chef.png";
import dinerImg from "../assets/diners.png";
// import ScrollAnimation from "react-animate-on-scroll";

import Nav from "./Nav";

const RegisterAs = () => {
    return (
        <div>
            <Nav />
            <div className="main-form">
                <div className="section">
                    {/* <ScrollAnimation animateIn="fadeIn"> */}
                        <img src={dinerImg} alt="diners" />
                    {/* </ScrollAnimation> */}

                    <span className="link">
                        <Link to="/register/diner">Register as a Diner</Link>
                    </span>
                </div>

                <div className="section">
                    {/* <ScrollAnimation animateIn="fadeIn"> */}
                        <img src={chefImg} alt="chef" />
                    {/* </ScrollAnimation> */}

                    <span className="link">
                    <Link to="/register/vendor">Register as a Vendor</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default RegisterAs;

