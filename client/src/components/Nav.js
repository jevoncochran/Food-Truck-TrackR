import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/white-logo.png";
import "../styling/Nav.scss";
import ScrollAnimation from "react-animate-on-scroll";

const Nav = () => {
  return (
    <header className="header-section">
      <ScrollAnimation
        offset={0}
        animateIn="fadeInLeft"
        animateOnce="true"
        className="logo-con"
      >
        <img className="logo-img" src={logo} alt="Food Truck logo" />
      </ScrollAnimation>

      <nav className="nav-bar">
        <a href="https://build-week-foodtruck-trackr-1.github.io/MarketingPage/">
          Home
        </a>
        <a href="https://build-week-foodtruck-trackr-1.github.io/MarketingPage/about.html">
          About Us
        </a>

        <NavLink to="/login" exact activeClassName="activeLink">
          Login
        </NavLink>
        <NavLink to="/register" exact activeClassName="activeLink">
          Sign Up
        </NavLink>
      </nav>
    </header>
  );
};

export default Nav;
