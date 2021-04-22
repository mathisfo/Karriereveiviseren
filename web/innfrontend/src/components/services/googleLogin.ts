import axios from "axios";

const googleLogin = async (accesstoken: any) => {
  let res = await axios.post(
    "login/",
    {
      access_token: accesstoken,
    },
    { withCredentials: true }
  );
  return await res.status;
};

export default googleLogin;
