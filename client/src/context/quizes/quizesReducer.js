import {
  //COMMON

  //GET TRAVIAS QUIZES
  GET_TRAVIAS_QUIZES,

  //GET YOUR QUIZES
  GET_YOUR_QUIZES,
  ACTIVE_ALL_QUIZES,
  ACTIVE_YOUR_QUIZES,
  ACTIVE_TRAVIAS_QUIZES
} from "../actionTypes";

export default (state, action) => {
  switch (action.type) {
    //COMMON

    //GET TRAVIAS QUIZES
    case GET_TRAVIAS_QUIZES:
      console.log(action.payload);
      return {
        ...state,
        traviasQuizes: action.traviasQuizes,
        quizesLoading: false
      };

    /* ######### */

    //GET YOU QUIZES
    case GET_YOUR_QUIZES:
      return {
        ...state,
        yourQuizes: action.yourQuizes
      };
    default:
      return state;
  }
};

// activeQuizNav,
// activeAllQuizes,
// activeYourQuizes,
// activeTraviasQuizes
