import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useBreadcrump } from "../../BreadcrumpProvider";

import "./Breadcrump.scss";

const Breadcrump: React.FC = () => {
  const { routes } = useBreadcrump();
  let prevRoutes: string = "";
  console.log(routes);

  return (
    <nav id="breadcrump">
      <div className="container">
        <div className="breadcrump">
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHome} />
          </Link>
          {routes.map((route, index) => {
            prevRoutes += route.pathname || "";

            return route.pathname ? (
              <div className="link" key={index}>
                <span className="separator">/</span>
                <Link to={prevRoutes}>{route.title}</Link>
              </div>
            ) : (
              <div className="link" key={index}>
                <span className="separator">/</span>
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
