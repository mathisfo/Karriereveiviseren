import axios from "axios";

const googleLogin = async (accesstoken: any) => {
    let res = await axios.post(
      "rest-auth/google/",
      {
        access_token: accesstoken,
      }
    );
    return await res.status;
  };

export default googleLogin;