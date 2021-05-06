import React, { useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store/store";
import { logoutUser, userSlice } from "../../redux/slices/userSlice";

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

  return (
    <div className="logout">
      <p className="userLogin">
        Logget inn som {user.name ? user.name : "Admin"}
      </p>
      <GoogleLogout
        clientId="246400382917-thmpcrkkuklceq5doiqsfv16qafvq9kr.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      ></GoogleLogout>
    </div>
  );
};

export default GoogleAuthLogout;
