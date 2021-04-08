import axios from "axios";

const googleLogin = async (accesstoken: any) => {
    let res = await axios.post(
      "http://localhost:8000/rest-auth/google/",
      {
        access_token: accesstoken,
      }
    );
    console.log(res);
    return await res.status;
  };

export default googleLogin;