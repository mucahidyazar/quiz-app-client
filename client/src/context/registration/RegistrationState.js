import React, { useReducer } from "react";
import axios from "axios";
import registrationContext from "./registrationContext";
import registrationReducer from "./registrationReducer";
import {
  SET_LOGIN_ACTIVE,
  SET_REGISTER_ACTIVE,
  USER_LOADED,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  LOGIN_FAIL,
  REGISTER_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../actionTypes";
import setAuthToken from "../../utils/setAuthToken";

const RegistrationState = props => {
  const initialState = {
    sectionLogin: "active",
    sectionRegister: "",
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(registrationReducer, initialState);

  const setLoginRegisterActive = section => {
    if (section === "login") {
      dispatch({
        type: SET_LOGIN_ACTIVE
      });
    } else if (section === "register") {
      dispatch({
        type: SET_REGISTER_ACTIVE
      });
    }
  };

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    console.log(localStorage.token);
    console.log(localStorage.getItem("token"));
    console.log("token");
    try {
      const res = await axios.get("/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload:
          "AUTH_ERROR: Token dogrulanamadi veya /auth'a GET isteginde bir sorun var"
      });
    }
  };

  const loginHandler = async formData => {
    try {
      const res = await axios.post("/auth", formData);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  const registerHandler = async registerObject => {
    try {
      const newUser = await axios.post("/users", registerObject);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: newUser.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  const logoutHandler = () => {
    dispatch({
      type: LOGOUT
    });
  };

  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };

  return (
    <registrationContext.Provider
      value={{
        sectionLogin: state.sectionLogin,
        sectionRegister: state.sectionRegister,
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        setLoginRegisterActive,
        loadUser,
        loginHandler,
        registerHandler,
        logoutHandler,
        clearErrors
      }}
    >
      {props.children}
    </registrationContext.Provider>
  );
};

export default RegistrationState;
