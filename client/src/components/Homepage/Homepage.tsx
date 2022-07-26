import React, { useEffect } from "react";
import { login } from "@/state/auth/authSlice";
import { userI } from "types/auth";
import jwt_decode from "jwt-decode";
import { CredentialResponse } from "google-one-tap";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { notify } from "@/Helpers";

import "./Homepage.scss";

declare global {
  const google: typeof import("google-one-tap");
}

const Homepage: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    const googleBtn = document.getElementById("signInDiv");

    if (googleBtn) {
      google.accounts.id.renderButton(googleBtn, {
        theme: "outline",
        size: "large",
      });
    }
  }, [auth]);

  const handleCallbackResponse = (response: CredentialResponse) => {
    const user: userI = jwt_decode(response.credential);
    dispatch(login(user));
    notify("success", "Login was successful");
  };

  return (
    <section id="homepage">
      <div className="card">
        <h1 className="main-title">Taskmaker</h1>
        <p>WebApp for creating tasks!</p>
        <div className="google">
          <p className="desc">Let's login with your Google account</p>
          <div id="signInDiv"></div>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
