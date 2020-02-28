import moment from "moment";
import {
  GET_QUIZ_SCOREBOARD,
  GET_QUIZES,
  GET_USER_QUIZES,
  SEARCH_QUIZES,
  SET_VALID_QUIZES,
  SORT_QUIZES_BY_DATE,
  SORT_QUIZES_BY_QUESTION,
  SORT_QUIZES_BY_TITLE
} from "../actionTypes";

export default (state, action) => {
  switch (action.type) {
    case GET_QUIZ_SCOREBOARD:
      return {
        ...state,
        specialQuizScoreboard: action.quizScoreboard
      };

    case GET_QUIZES:
      return {
        ...state,
        quizes: action.quizes
      };

    case GET_USER_QUIZES:
      return {
        ...state,
        userQuizes: action.userQuizes
      };

    case SEARCH_QUIZES:
      if (action.key === "") {
        return {
          ...state,
          searchedQuizes: null,
          specialQuizScoreboard: null
        };
      } else {
        return {
          ...state,
          searchedQuizes: state.quizes.filter(
            quiz =>
              (quiz.quizTitle
                .toLowerCase()
                .includes(action.key.toLowerCase()) &&
                quiz) ||
              (quiz.quizDescription
                .toLowerCase()
                .includes(action.key.toLowerCase()) &&
                quiz) ||
              (quiz.quizCategory
                .toLowerCase()
                .includes(action.key.toLowerCase()) &&
                quiz) ||
              (quiz.quizType.toLowerCase().includes(action.key.toLowerCase()) &&
                quiz) ||
              (quiz.quizDifficulty
                .toLowerCase()
                .includes(action.key.toLowerCase()) &&
                quiz)
          )
        };
      }

    case SET_VALID_QUIZES:
      return {
        ...state,
        validQuizes: action.quizes
      };

    case SORT_QUIZES_BY_DATE:
      const newQuizes = [...state.quizes].sort((a, b) => {
        if (
          moment(a.quizDate)
            .utc()
            .valueOf() <
          moment(b.quizDate)
            .utc()
            .valueOf()
        ) {
          return -1;
        } else if (
          moment(a.quizDate)
            .utc()
            .valueOf() >
          moment(b.quizDate)
            .utc()
            .valueOf()
        ) {
          return -1;
        } else return 0;
      });
      return {
        ...state,
        quizes: newQuizes
      };

    case SORT_QUIZES_BY_QUESTION:
      return {
        ...state,
        quizes: state.quizes.sort((a, b) => {
          if (a.quizQuestions.length < b.quizQuestions.length) {
            return -1;
          }
          if (a.quizQuestions.length > b.quizQuestions.length) {
            return -1;
          }
          return 0;
        })
      };

    case SORT_QUIZES_BY_TITLE:
      return {
        ...state,
        quizes: state.quizes.sort((a, b) => {
          let titleA = a.quizTitle.toLowerCase();
          let titleB = b.quizTitle.toLowerCase();
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return -1;
          }
          return 0;
        })
      };

    /* DEFAULT */
    default:
      return state;
  }
};
