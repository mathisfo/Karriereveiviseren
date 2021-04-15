import React, { FC } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin } from 'react-google-login';

const clientId = '777211810427-ouu1bvkg7mv0233rlsm7acjmmcs6s91b.apps.googleusercontent.com';


const Login = () => {
  localStorage.setItem("LandingKey", "true");

  const onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log('[Login Success] currentUser:', response);
    localStorage.setItem("LandingKey", "false");
    window.location.reload();
  };

  const onFailure = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log('[Login failed] res:', response)
    
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
  });

  return (
    <button onClick={signIn} className="button">
    <img src="icons/google.svg" alt="google login" className="icon"></img>

    <span className="buttonText">Sign in with Google</span>
  </button>
  );
};

export default Login;
