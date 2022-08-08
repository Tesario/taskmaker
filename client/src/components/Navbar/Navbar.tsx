import React, { useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "@assets/img/logo.png";
import { useTheme } from "@/ThemeProvider";
import ThemeButton from "@components/Buttons/ThemeButton";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { signOut } from "@/state/auth/authSlice";
import User from "../auth/User";
import ToolButton from "../Tasks/TaskBar/ToolForms/ToolButton/ToolButton";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { notify } from "@/Helpers";
import Cookies from "js-cookie";
import { clearTasks } from "@/state/tasks/tasksSlice";

import "./Navbar.scss";

const Navbar: React.FC = () => {
  const togglerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);
  const themeContext = useTheme();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const onLogout = () => {
    google.accounts.id.disableAutoSelect();
    dispatch(signOut());
    dispatch(clearTasks());
    Cookies.remove("token", { path: "/" });
    notify("success", "Logout was successful");
    navigate("/", { replace: true });
  };

  const toggleMenu = () => {
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
          {auth.user && (
            <ul className="left-menu">
              <li className="menu-item">
                <NavLink className="link" to="/tasks" onClick={toggleMenu}>
                  Tasks
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink className="link" to="/stats" onClick={toggleMenu}>
                  Statistics
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink className="link" to="/categories" onClick={toggleMenu}>
                  Categories
                </NavLink>
              </li>
            </ul>
          )}
          <div className="right-menu">
            <ThemeButton />
            {auth.user && (
              <>
                <User user={auth.user} />
                <ToolButton
                  onClick={() => {
                    onLogout();
                    toggleMenu();
                  }}
                  icon={faRightFromBracket}
                  className="without-hover"
                />
              </>
            )}
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
