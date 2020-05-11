import axios from "../axios-orders";

const setAuthToken = (token) => {
  console.log("token");
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
    console.log(token);
  } else {
    delete axios.dafaults.header.common["x-auth-token"];
    console.log("200");
  }
};

export default setAuthToken;
