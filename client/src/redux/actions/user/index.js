import axios from "../../../axios-orders";
import setAuthToken from "../../../utils/setAuthToken";
import {
  ACTION_AUTH_ERROR,
  ACTION_CLEAR_ERRORS,
  ACTION_GET_USERS,
  ACTION_LOGIN_FAIL,
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGOUT,
  ACTION_REGISTER_FAIL,
  ACTION_REGISTER_SUCCESS,
  ACTION_SET_LOGIN_ACTIVE,
  ACTION_SET_REGISTER_ACTIVE,
  ACTION_USER_LOADED,
} from "../../types";

export const clearErrors = () => ({
  type: ACTION_CLEAR_ERRORS,
});

export const getUsers = () => {
  return async (dispatch) => {
    const users = await axios.get("users");
    dispatch({
      type: ACTION_GET_USERS,
      users: users.data,
    });
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    try {
      const res = await axios.get("/auth");
      dispatch({ type: ACTION_USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({
        type: ACTION_AUTH_ERROR,
        payload:
          "AUTH_ERROR: Token dogrulanamadi veya /auth'a GET isteginde bir sorun var",
      });
    }
  };
};

export const loginHandler = (formData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/auth", formData);
      dispatch({
        type: ACTION_LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: ACTION_LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
};

export const logoutHandler = () => ({
  type: ACTION_LOGOUT,
});

export const registerHandler = (registerObject) => {
  return async (dispatch) => {
    try {
      const newUser = await axios.post("/users", registerObject);
      dispatch({
        type: ACTION_REGISTER_SUCCESS,
        payload: newUser.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: ACTION_REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
};

export const setLoginRegisterActive = (section) => {
  return async (dispatch) => {
    if (section === "login") {
      dispatch({
        type: ACTION_SET_LOGIN_ACTIVE,
      });
    } else if (section === "register") {
      dispatch({
        type: ACTION_SET_REGISTER_ACTIVE,
      });
    }
  };
};

export const userUpdate = (updatedUser) => {
  try {
    axios.put(`/users/${updatedUser.id}`, updatedUser);
  } catch (err) {
    console.error(err);
  }
};
