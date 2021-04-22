import axios from "axios";
import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import googleLogin from "./services/googleLogin";
 
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const test = async () => {
  let userInfo = await axios.get("http://localhost:8000/dj-rest-auth/user/", {
    withCredentials: true,
  });
  console.log(userInfo);
  return userInfo.data;
};

const GoogleSocialAuth = () => {
  const responseGoogle = async (response: any) => {
    let googleResponse = await googleLogin(response.accessToken);
    console.log("googleResponse:");
    console.log(googleResponse);
    console.log("response:");
    console.log(response);
    let userInfo = test();
  };

  const logout = async () => {
    let userInfo = await test()
      .then(async (userinfo) => {
        console.log(userinfo)
        let res = await axios.post(
          "http://localhost:8000/dj-rest-auth/logout/",
          {},
          { withCredentials: true }
        );
      });
  };

  return (
    <div className="Login">
      <h1>Login with your Trovo or Google account</h1>
      <GoogleLogin
        clientId="268749028652-1da4v4e8hq7ddrjfg9ac4tt5e9h9cu6b.apps.googleusercontent.com"
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
      <GoogleLogout
        clientId="268749028652-1da4v4e8hq7ddrjfg9ac4tt5e9h9cu6b.apps.googleusercontent.com"
        buttonText="LOGOUT FROM GOOGLE"
        onLogoutSuccess={logout}
      ></GoogleLogout>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default GoogleSocialAuth;
