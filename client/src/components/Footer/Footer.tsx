import React from "react";
import { useTheme } from "@/ThemeProvider";

import "./Footer.scss";

const Footer: React.FC = () => {
  const themeContext = useTheme();

  return (
    <footer id="footer" className={themeContext}>
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
