import axios from "axios";

const googleLogin = async (accesstoken: any) => {
  let res = await axios.post(
    "http://localhost:8000/login/",
    {
      access_token: accesstoken,
    },
    { withCredentials: true }
  );
  console.log("service res:");
  console.log(res);
  return await res.status;
};

export default googleLogin;
