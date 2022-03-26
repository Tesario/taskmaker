import React from "react";
import { Link } from "react-router-dom";

import "./Error.scss";

const Error = ({ error }) => {
  const { message, code } = error;
  return (
    <section id="error">
      <div className="container">
        <div className="content">
          <h1 className="title">
            {code} - {message}
          </h1>
          <Link to="/" className="btn btn-secondary">
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error;
