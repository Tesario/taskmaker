import React, { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "@assets/img/logo.png";
import { useTheme } from "@/ThemeProvider";
import ThemeButton from "@components/Buttons/ThemeButton";

import "./Navbar.scss";

declare global {
  const google: typeof import("google-one-tap");
}

const Navbar: React.FC = () => {
  const togglerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);
  const themeContext = useTheme();

  function handleCallbackResponse(response: any) {
    console.log(response.credential);
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "1022337813280-hulo3r9olvuu4kdtorp81d3ega954th5.apps.googleusercontent.com",
      callback: handleCallbackResponse,
      auto_select: false,
    });

    const googleBtn = document.getElementById("signInDiv");

    if (googleBtn) {
      google.accounts.id.renderButton(googleBtn, {
        theme: "outline",
        size: "large",
      });
    }
  }, []);

  const toggleMenu = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();

    if (togglerRef.current && menuRef.current && overlayRef.current) {
      togglerRef.current.classList.toggle("collapsed");
      menuRef.current.classList.toggle("collapsed");
      overlayRef.current.classList.toggle("collapsed");
    }
  };

  return (
    <nav id="navbar" className={themeContext}>
      <div className="container">
        <Link to="/" className="brand">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="menu" ref={menuRef}>
          <ul className="left-menu">
            <li className="menu-item">
              <NavLink className="link" to="/tasks">
                Tasks
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink className="link" to="/stats">
                Statistics
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink className="link" to="/calendar">
                Calendar
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink className="link" to="/goals">
                Goals
              </NavLink>
            </li>
          </ul>
          <div className="right-menu">
            <ThemeButton />
            {/* <Link to="/login" className="btn btn-primary">
              Login
            </Link> */}
            <div id="signInDiv"></div>
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
