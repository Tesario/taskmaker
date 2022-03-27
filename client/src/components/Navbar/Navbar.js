import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo.png";

import "./Navbar.scss";

const Navbar = () => {
  const togglerRef = useRef(null);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const page = useLocation().pathname;

  const toggleMenu = (e) => {
    e.preventDefault();
    togglerRef.current.classList.toggle("collapsed");
    menuRef.current.classList.toggle("collapsed");
    overlayRef.current.classList.toggle("collapsed");
  };

  return (
    <nav id="navbar">
      <div className="container">
        <Link to="/" className="brand">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="menu" ref={menuRef}>
          <ul className="left-menu">
            <li className="menu-item">
              <Link
                className={`link ${page === "/tasks" ? "current" : ""}`}
                to="/tasks"
              >
                Tasks
              </Link>
            </li>
            <li className="menu-item">
              <Link
                className={`link ${page === "/stats" ? "current" : ""}`}
                to="/stats"
              >
                Statistics
              </Link>
            </li>
            <li className="menu-item">
              <Link
                className={`link ${page === "/goals" ? "current" : ""}`}
                to="/goals"
              >
                Goals
              </Link>
            </li>
          </ul>
          <div className="right-menu">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        </div>
        <button
          type="button"
          className="toggler btn"
          ref={togglerRef}
          onClick={toggleMenu}
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>
      </div>
      <span id="dark-overlay" ref={overlayRef} onClick={toggleMenu}></span>
    </nav>
  );
};

export default Navbar;
