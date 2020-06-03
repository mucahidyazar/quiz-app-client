import moment from "moment";
import {
  ACTION_GET_QUIZES,
  ACTION_GET_QUIZ_SCOREBOARD,
  ACTION_GET_USER_QUIZES,
  ACTION_SEARCH_QUIZES,
  ACTION_SET_QUIZ_DIFFICUTY,
  ACTION_SET_VALID_QUIZES,
  ACTION_SORT_QUIZES,
} from "../../types";

const initialState = {
  quizes: [],
  filteredQuizes: null,
  countdown: 60,
  disabledTime: false,
  disabledTwoOff: false,
  quizesLoading: true,
  sortedQuizes: null,
  specialQuizScoreboard: null,
  userQuizes: null,
  validQuizes: null,
};

export const quiz = (state = initialState, action) => {
  let quizesData;

  switch (action.type) {
    case ACTION_GET_QUIZES:
      return {
        ...state,
        quizes: action.quizes,
      };

    case ACTION_GET_QUIZ_SCOREBOARD:
      return {
        ...state,
        specialQuizScoreboard: action.quizScoreboard,
      };

    case ACTION_GET_QUIZES:
      return {
        ...state,
        quizes: action.quizes,
      };

    case ACTION_SEARCH_QUIZES:
      quizesData = state.filteredQuizes ? state.filteredQuizes : state.quizes;
      if (action.value === "") {
        quizesData = state.quizes;
      } else {
        quizesData = state.quizes.filter(
          (quiz) =>
            (quiz.quizTitle.toLowerCase().includes(action.value) && quiz) ||
            (quiz.quizDescription.toLowerCase().includes(action.value) &&
              quiz) ||
            (quiz.quizCategory.toLowerCase().includes(action.value) && quiz) ||
            (quiz.quizType.toLowerCase().includes(action.value) && quiz) ||
            (quiz.quizDifficulty.toLowerCase().includes(action.value) && quiz)
        );
      }
      return {
        ...state,
        filteredQuizes: quizesData,
      };

    case ACTION_GET_USER_QUIZES:
      return {
        ...state,
        userQuizes: action.userQuizes,
      };

    case ACTION_SET_QUIZ_DIFFICUTY:
      console.log(action.difficult);
      if (action.difficult === "all") {
        quizesData = state.quizes;
      } else {
        quizesData = state.quizes.filter(
          (quiz) => quiz.quizDifficulty === action.difficult
        );
      }
      return {
        ...state,
        filteredQuizes: quizesData,
      };

    case ACTION_SET_VALID_QUIZES:
      return {
        ...state,
        validQuizes: action.quizes,
      };

    case ACTION_SORT_QUIZES:
      quizesData = state.filteredQuizes ? state.filteredQuizes : state.quizes;
      if (action.by === "date") {
        quizesData = state.quizes.sort((a, b) => {
          if (
            moment(a.quizDate).utc().valueOf() <
            moment(b.quizDate).utc().valueOf()
          ) {
            return -1;
          } else if (
            moment(a.quizDate).utc().valueOf() >
            moment(b.quizDate).utc().valueOf()
          ) {
            return -1;
          } else return 0;
        });
      } else if (action.by === "question") {
        quizesData = state.quizes.sort((a, b) => {
          if (a.quizQuestions.length < b.quizQuestions.length) {
            return -1;
          }
          if (a.quizQuestions.length > b.quizQuestions.length) {
            return -1;
          }
          return 0;
        });
      } else if (action.by === "title") {
        quizesData = state.quizes.sort((a, b) => {
          let titleA = a.quizTitle.toLowerCase();
          let titleB = b.quizTitle.toLowerCase();
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return -1;
          }
          return 0;
        });
      }
      return {
        ...state,
        filteredQuizes: quizesData,
      };
    default:
      return state;
  }
};
