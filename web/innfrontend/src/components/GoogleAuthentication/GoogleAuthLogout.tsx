import axios from "axios";
import React, { useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../store/redux/store";
import { logoutUser, userSlice } from "../../store/slices/userSlice";

import "./googleLogin.css";

const GoogleAuthLogout = () => {
  const dispatch = useAppDispatch();
  const { user, isFetching, isSuccess, isError, errorMessage } = useSelector(
    (state: AppState) => state.user
  );

  const logout = async () => {
    dispatch(logoutUser());
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

  // TODO: Clean up the conditional name redering
  return (
    <div className="logout">
      <p className="userLogin">
        Logget inn som {user.name ? user.name : "Admin"}
      </p>
      <GoogleLogout
        clientId="268749028652-1da4v4e8hq7ddrjfg9ac4tt5e9h9cu6b.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      ></GoogleLogout>
    </div>
  );
};

export default GoogleAuthLogout;
