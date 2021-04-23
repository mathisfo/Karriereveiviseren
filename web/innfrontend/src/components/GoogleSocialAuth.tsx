import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import googleLogin from "./services/googleLogin";

const GoogleSocialAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const responseGoogle = async (response: any) => {
    let googleResponse = await googleLogin(response.accessToken);
    if (googleResponse === 200) {
      setAuthenticated(true);
    }
  };

  const logout = async () => {
    let res = await axios.post(
      "dj-rest-auth/logout/",
      {},
      { withCredentials: true }
    );
    if (res.status === 200) {
      setAuthenticated(false);
    }
  };

  const isLoggedIn = async () => {
    let userInfo = await axios.get("dj-rest-auth/user/", {
      withCredentials: true,
    });
    userInfo.status === 200 ? setAuthenticated(true) : setAuthenticated(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <div className="Login">
      {!authenticated ? (
        <GoogleLogin
          clientId="268749028652-1da4v4e8hq7ddrjfg9ac4tt5e9h9cu6b.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      ) : (
        <GoogleLogout
          clientId="268749028652-1da4v4e8hq7ddrjfg9ac4tt5e9h9cu6b.apps.googleusercontent.com"
          buttonText="LOGOUT FROM GOOGLE"
          onLogoutSuccess={logout}
        ></GoogleLogout>
      )}
    </div>
  );
};

export default GoogleSocialAuth;
