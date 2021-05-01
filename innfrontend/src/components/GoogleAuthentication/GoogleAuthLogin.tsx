import axios from "axios";
import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../store/redux/store";
import { loginUser, userSlice } from "../../store/slices/userSlice";

import "./googleLogin.css";

const GoogleAuthLogin = () => {
  const dispatch = useAppDispatch();
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    (state: AppState) => state.user
  );

  const responseGoogle = async (response: any) => {
    dispatch(loginUser(response.accessToken));
  };

  useEffect(() => {
    return () => {
      dispatch(userSlice.actions.clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      console.error(errorMessage);
      dispatch(userSlice.actions.clearState());
    }

    if (isSuccess) {
      dispatch(userSlice.actions.clearState());
    }
  }, [isError, isSuccess]);

  return (
    <div className="login">
      <p className="tempText">
        Dette er en testutgave laget av NTNU studenter for INN. Som en følge av
        dette kan det hende at all funksjonalitet ikke er tilpasset alle
        nettlesere på markedet. Utviklerteamet anbefaler å bruke Chromium
        baserte nettlesere eller Safari da Firefox ikke er ferdig støttet. Kun
        gyldige Trovo kontoer fra Google kan brukes til å logge inn. Innlogging
        gjennom inkognito modus i Google Chrome er ikke mulig på dette
        tidspunktet grunnet en inkompatibilitet med hvordan nettleseren
        håndterer forespørsler.
      </p>
      <GoogleLogin
        className="loginButton"
        clientId="246400382917-thmpcrkkuklceq5doiqsfv16qafvq9kr.apps.googleusercontent.com"
        buttonText="Login through Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  );
};

export default GoogleAuthLogin;
