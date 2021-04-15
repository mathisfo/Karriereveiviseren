import React, { Component } from "react";
import GoogleLogin from "react-google-login";

const GoogleAuth = () => {
  const googleResponse = (response: any) => {
    console.log(response);
  };

  const clientId =
    "777211810427-ouu1bvkg7mv0233rlsm7acjmmcs6s91b.apps.googleusercontent.com";
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
