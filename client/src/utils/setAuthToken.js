import axios from "../axios-orders";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.dafaults.header.common["Authentication"];
  }
};

export default setAuthToken;
