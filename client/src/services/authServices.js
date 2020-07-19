import axios from "./axios";

axios.setToken(getToken());

export async function getCurrentUser() {
  return await axios.get("/user/me");
}

export function getToken() {
  return localStorage.getItem("token");
}
