import React from "react";
import GoogleLogin from "react-google-login";

import googleLogin from "./services/googleLogin";

const GoogleSocialAuth = () => {
  const responseGoogle = async (response: any) => {
    let googleResponse = await googleLogin(response.accessToken);
    console.log("googleResponse:");
    console.log(googleResponse);
    console.log("response:");
    console.log(response);
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
    </div>
  );
};

export default GoogleSocialAuth;