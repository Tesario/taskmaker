import React from "react";

import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer id="footer">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} TaskMaker <span>|</span> Code &
          design by&#8201;
          <a href="https://tesarvojtech.cz/">Vojtěch Tesař</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
