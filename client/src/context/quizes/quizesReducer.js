import moment from "moment";
import {
  //COMMON
  SET_VALID_QUIZES,
  SEARCH_QUIZES,
  SORT_YOUR_QUIZES_BY_DATE,
  SORT_YOUR_QUIZES_BY_TITLE,
  SORT_YOUR_QUIZES_BY_QUESTION,

  //GET_ALL_QUIZES
  GET_ALL_QUIZES,

  //GET YOUR QUIZES
  GET_YOUR_QUIZES,
  ACTIVE_ALL_QUIZES,
  ACTIVE_YOUR_QUIZES,
  ACTIVE_TRAVIAS_QUIZES,

  //GET TRAVIAS QUIZES
  GET_TRAVIAS_QUIZES
} from "../actionTypes";

export default (state, action) => {
  switch (action.type) {
    //COMMON
    case SET_VALID_QUIZES:
      return {
        ...state,
        validQuizes: action.quizes
      };
    case SEARCH_QUIZES:
      return {
        ...state,
        searchedQuizes: state.yourQuizes.filter(
          quiz =>
            (quiz.quizTitle.toLowerCase().includes(action.key.toLowerCase()) &&
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

    case SORT_YOUR_QUIZES_BY_DATE:
      return {
        ...state,
        yourQizes: state.yourQuizes.sort((a, b) => {
          if (
            moment(a.quizDate)
              .startOf("day")
              .fromNow()
              .slice(0, 1) <
            moment(b.quizDate)
              .startOf("day")
              .fromNow()
              .slice(0, 1)
          ) {
            return -1;
          }
          if (
            moment(a.quizDate)
              .startOf("day")
              .fromNow()
              .slice(0, 1) >
            moment(b.quizDate)
              .startOf("day")
              .fromNow()
              .slice(0, 1)
          ) {
            return -1;
          }
          return 0;
        })
      };

    case SORT_YOUR_QUIZES_BY_TITLE:
      return {
        ...state,
        yourQizes: state.yourQuizes.sort((a, b) => {
          let titleA = a.quizTitle.toUpperCase();
          let titleB = b.quizTitle.toUpperCase();
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return -1;
          }
          return 0;
        })
      };

    case SORT_YOUR_QUIZES_BY_QUESTION:
      return {
        ...state,
        yourQizes: state.yourQuizes.sort((a, b) => {
          if (a.quizQuestions.length < b.quizQuestions.length) {
            return -1;
          }
          if (a.quizQuestions.length > b.quizQuestions.length) {
            return -1;
          }
          return 0;
        })
      };

    //GET YOU QUIZES
    case GET_YOUR_QUIZES:
      console.log(action.yourQuizes);
      return {
        ...state,
        yourQuizes: action.yourQuizes
      };

    //GET TRAVIAS QUIZES
    case GET_TRAVIAS_QUIZES:
      console.log(action.payload);
      return {
        ...state,
        traviasQuizes: action.traviasQuizes,
        allQuizes: [...state.yourQuizes, ...action.traviasQuizes],
        quizesLoading: false
      };

    /* ######### */
    default:
      return state;
  }
};

// activeQuizNav,
// activeAllQuizes,
// activeYourQuizes,
// activeTraviasQuizes
