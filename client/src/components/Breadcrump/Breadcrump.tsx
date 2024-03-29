import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useBreadcrump } from "@/BreadcrumpProvider";
import { useTheme } from "@/ThemeProvider";

import "./Breadcrump.scss";

const Breadcrump: React.FC = () => {
  const { routes } = useBreadcrump();
  const themeContext = useTheme();
  let prevRoutes: string = "";

  return (
    <nav id="breadcrump" className={themeContext}>
      <div className="container">
        <div className="breadcrump">
          <div className="link">
            <Link to={"/"}>
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </div>
          {routes.map((route, index) => {
            prevRoutes += route.pathname || "";

            return route.pathname ? (
              <div className="link" key={index}>
                <Link to={prevRoutes}>{route.title}</Link>
              </div>
            ) : (
              <div className="link" key={index}>
                <span>{route.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrump;
