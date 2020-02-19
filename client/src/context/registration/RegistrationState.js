import React, { useReducer } from "react";
import axios from "../../axios-orders";
import registrationContext from "./registrationContext";
import registrationReducer from "./registrationReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  SET_LOGIN_ACTIVE,
  SET_REGISTER_ACTIVE,
  USER_LOADED,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS
} from "../actionTypes";

const RegistrationState = props => {
  const initialState = {
    sectionLogin: "active",
    sectionRegister: "",
    user: null,
    isAuthenticated: false,
    loading: false
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

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  const loginHandler = async loginObject => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const user = await axios.post("/auth", loginObject, config);
      dispatch({
        type: LOGIN_SUCCESS,
        user: user.data
      });
      loadUser();
    } catch (err) {
      console.log("Login" + err);
    }
  };

  const registerHandler = registerObject => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const newUser = axios.post("/users", registerObject, config);
      dispatch({
        type: REGISTER_SUCCESS,
        user: newUser.data
      });
      loadUser();
    } catch (err) {
      console.log("Register" + err);
    }
  };

  return (
    <registrationContext.Provider
      value={{
        sectionLogin: state.sectionLogin,
        sectionRegister: state.sectionRegister,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        setLoginRegisterActive,
        loginHandler,
        registerHandler
      }}
    >
      {props.children}
    </registrationContext.Provider>
  );
};

export default RegistrationState;
