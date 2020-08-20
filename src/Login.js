import React from "react";
import { GoogleLogin } from "react-google-login";
import Axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};

const responseGoogle = async (response) => {
  console.log(response); //json
  let res = { ...response, ...{ provider: "google" } }; //스프링서버에 요청하기 전에 이렇게 해서 하는 방법도 있어요.
  let jwtToken = await Axios.post(
    "http://localhost:8080/oauth/jwt/google",
    JSON.stringify(response),
    config
  ); //두번째 파라메터는 body data 자리.
  if (jwtToken.status === 200) {
    console.log(2, jwtToken.data);
    localStorage.setItem("jwtToken", jwtToken.data);
  }
  console.log(2, jwtToken.data);
};

const Login = () => {
  return (
    <GoogleLogin
      clientId=""
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default Login;
