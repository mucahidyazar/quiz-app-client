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

const initialState = {
  users: [],
  sectionLogin: "active",
  sectionRegister: "",
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_AUTH_ERROR: //
    case ACTION_LOGIN_FAIL:
    case ACTION_REGISTER_FAIL:
    case ACTION_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    case ACTION_REGISTER_SUCCESS:
    case ACTION_LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case ACTION_GET_USERS:
      return {
        ...state,
        users: action.users,
      };

    case ACTION_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case ACTION_SET_LOGIN_ACTIVE:
      return {
        ...state,
        sectionLogin: "active",
        sectionRegister: "",
      };

    case ACTION_SET_REGISTER_ACTIVE:
      return {
        ...state,
        sectionRegister: "active",
        sectionLogin: "",
      };

    case ACTION_USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    default:
      return state;
  }
};
