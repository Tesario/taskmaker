import React from "react";

import "./Loader.scss";

const Loader: React.FC = () => {
  return (
    <div id="loader">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default Loader;
