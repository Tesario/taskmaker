import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";

import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav id="navbar">
      <div className="container">
        <Link to="/" className="brand">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="primary-menu">
          <ul className="menu">
            <li className="menu-item">
              <Link className="link" to="/tasks">
                Tasks
              </Link>
            </li>
            <li className="menu-item">
              <Link className="link" to="/stats">
                Statistics
              </Link>
            </li>
            <li className="menu-item">
              <Link className="link" to="/goals">
                Goals
              </Link>
            </li>
          </ul>
        </div>
        <div className="secondary-menu">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
