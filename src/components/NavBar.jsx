import React from "react";
import "./NavBarStyles.css";
import {NavLink} from "react-router";

const NavBar = () => {
  return <nav className=".nav">
    <NavLink to = "/" > Homepage </NavLink>
    <NavLink to = "/all-campuses" > Campuses </NavLink>
    <NavLink to = "/all-students" > Students </NavLink>
  </nav>;
};

export default NavBar;
