import {
  ADD_NEW_ANSWER,
  TRUE_OR_FALSE_ACTION,
  SET_ANSWER
} from "../actionTypes";

export default (state, action) => {
  switch (action.type) {
    case ADD_NEW_ANSWER:
      return {
        ...state,
        answers: [...state.answers, ""]
      };
    case TRUE_OR_FALSE_ACTION:
      return {
        ...state,
        correct_answer: action.payload
      };
    case SET_ANSWER:
      let ans = state.answers;
      ans[action.index] = action.value;
      return {
        ...state,
        answers: ans
      };
    default:
      return state;
  }
};
