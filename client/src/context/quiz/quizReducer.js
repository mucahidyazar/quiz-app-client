import { GET_QUIZES } from "../actionTypes";

export default (state, action) => {
  switch (action.type) {
    case GET_QUIZES:
      console.log(action.payload);
      return {
        ...state,
        quizes: action.payload,
        quizesLoading: false
      };
    default:
      return state;
  }
};
