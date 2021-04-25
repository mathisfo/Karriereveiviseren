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
      <GoogleLogin
        className="loginButton"
        clientId="268749028652-1da4v4e8hq7ddrjfg9ac4tt5e9h9cu6b.apps.googleusercontent.com"
        buttonText="Login through Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  );
};

export default GoogleAuthLogin;
