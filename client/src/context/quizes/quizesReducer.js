import moment from "moment";
import {
  GET_QUIZ_SCOREBOARD,
  GET_QUIZES,
  GET_USER_QUIZES,
  SEARCH_QUIZES,
  SET_VALID_QUIZES,
  SORT_QUIZES_BY_DATE,
  SORT_QUIZES_BY_QUESTION,
  SORT_QUIZES_BY_TITLE,
} from "../actionTypes";

export default (state, action) => {
  switch (action.type) {
    case GET_QUIZ_SCOREBOARD:
      return {
        ...state,
        specialQuizScoreboard: action.quizScoreboard,
      };

    case GET_QUIZES: //
      return {
        ...state,
        quizes: action.quizes,
      };

    case GET_USER_QUIZES:
      return {
        ...state,
        userQuizes: action.userQuizes,
      };

    case SET_VALID_QUIZES:
      return {
        ...state,
        validQuizes: action.quizes,
      };

    /* DEFAULT */
    default:
      return state;
  }
};
