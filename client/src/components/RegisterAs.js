import React from "react";
import { Link } from "react-router-dom";
import "../styling/RegisterAs.scss";
import chefImg from "../assets/vendorcat.jpg";
import dinerImg from "../assets/truckdiners.jpg";
import ScrollAnimation from "react-animate-on-scroll";

import Nav from "./Nav";

const RegisterAs = () => {
  return (
    <div>
      <Nav />
      <div className="main-form">
        <div className="section">
          <ScrollAnimation animateIn="fadeIn" offset={0}>
            <div className="vert-img">
              <img src={dinerImg} alt="diners" />
            </div>
          </ScrollAnimation>

          <span className="link diner">
            <Link to="/register/diner">Register as a Diner</Link>
          </span>
        </div>

        <div className="section section2">
          <ScrollAnimation animateIn="fadeIn" offset={0}>
            <div className="vert-img">
              <img src={chefImg} alt="chef" />
            </div>
          </ScrollAnimation>

          <span className="link vendor">
            <Link to="/register/vendor">Register as a Vendor</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterAs;
