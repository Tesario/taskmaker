import React from "react";
import { Outlet } from "react-router-dom";

const LoginLayout: React.FC = () => {
  return (
    <section id="login">
      <div className="container">
        <div className="form-card">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default LoginLayout;
