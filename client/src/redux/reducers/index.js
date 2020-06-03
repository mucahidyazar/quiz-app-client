import { combineReducers } from "redux";
import { create } from "./create";
import { quiz } from "./quiz";
import { user } from "./user";

export const reducers = combineReducers({
  create,
  quiz,
  user,
});
