import {
  SET_LOGIN_ACTIVE,
  SET_REGISTER_ACTIVE,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  USER_LOADED
} from "../actionTypes";

const registrationReducer = (state, action) => {
  switch (action.type) {
    case SET_LOGIN_ACTIVE:
      return {
        ...state,
        sectionLogin: "active",
        sectionRegister: ""
      };
    case SET_REGISTER_ACTIVE:
      return {
        ...state,
        sectionRegister: "active",
        sectionLogin: ""
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.user.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case USER_LOADED:
      console.log(action.paylaod);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.paylaod
      };
    default:
      return state;
  }
};

export default registrationReducer;
