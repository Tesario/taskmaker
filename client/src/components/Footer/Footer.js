import React from "react";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        &copy; {new Date().getFullYear()} TaskMaker | Code & design by&nbsp;
        <a href="https://tesarvojtech.cz/">Vojtěch Tesař</a>
      </div>
    </footer>
  );
};

export default Footer;
