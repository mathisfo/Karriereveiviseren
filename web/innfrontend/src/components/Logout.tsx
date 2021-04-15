import React, { FC } from 'react';
import { GoogleLogout, useGoogleLogout } from 'react-google-login';

const clientId = '777211810427-ouu1bvkg7mv0233rlsm7acjmmcs6s91b.apps.googleusercontent.com';



const Logout = () => {


    const onLogoutSuccess = () => {
      localStorage.setItem("LandingKey", "true");
        console.log('Logged out Success');
        window.location.reload();
      };
    
      const onFailure = () => {
        console.log('Handle failure cases');
      };

    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure,
    });

  return (
    <button onClick={signOut} className="button">
    <img src="icons/google.svg" alt="google login" className="icon"></img>

    <span className="buttonText">Sign out</span>
  </button>
  );
}

export default Logout;