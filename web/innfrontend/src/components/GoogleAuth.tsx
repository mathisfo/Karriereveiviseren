import React, { Component } from "react";
import GoogleLogin from "react-google-login";

const GoogleAuth = () => {
  const googleResponse = (response: any) => {
    //console.log(response);
  };

  const clientId =
    "268749028652-1da4v4e8hq7ddrjfg9ac4tt5e9h9cu6b.apps.googleusercontent.com";
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText={"Login with trovo"}
      onSuccess={googleResponse}
      onFailure={googleResponse}
    />
  );
};

export default GoogleAuth;
