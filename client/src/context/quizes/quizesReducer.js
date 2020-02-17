import {
  //COMMON
  SET_VALID_QUIZES,

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

    //GET YOU QUIZES
    case GET_YOUR_QUIZES:
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
