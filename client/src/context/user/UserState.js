import React, { useReducer } from "react";
import axios from "../../axios-orders";
import userContext from "./userContext";
import userReducer from "./userReducer";
import { GET_USERS } from "../actionTypes";

const UserState = (props) => {
  const initialState = {
    users: null,
  };
  const [state, dispatch] = useReducer(userReducer, initialState);

  const getUsers = async () => {
    try {
      const users = await axios.get("/users");
      dispatch({
        type: GET_USERS,
        users: users.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <userContext.Provider
      value={{
        users: state.users,
        getUsers,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
