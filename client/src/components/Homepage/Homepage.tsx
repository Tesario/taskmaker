import React, { useEffect } from "react";
import { login } from "@/state/auth/authSlice";
import { userI } from "types/auth";
import { graphQLFetch } from "@/Helpers";
import { CredentialResponse } from "google-one-tap";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { notify } from "@/Helpers";
import { useTheme } from "@/ThemeProvider";
import Cookie from "js-cookie";

import "./Homepage.scss";

declare global {
  const google: typeof import("google-one-tap");
}

const Homepage: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const themeContext = useTheme();

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

  const handleCallbackResponse = async (response: CredentialResponse) => {
    const token = response.credential;

    const query = `mutation userLogin($token: String!) {
      userLogin(token: $token) {
        given_name
        family_name
        picture
        name
        uuid
      }
    }`;

    const data: { userLogin: userI } = await graphQLFetch(query, { token });

    if (data) {
      dispatch(login(data.userLogin));
      Cookie.set("token", token, { path: "/" });
      notify("success", "Login was successful");
    }
  };

  return (
    <section id="homepage" className={themeContext}>
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
