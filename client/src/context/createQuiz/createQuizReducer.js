import {
  ADD_NEW_ANSWER,
  TRUE_OR_FALSE_ACTION,
  SET_ANSWER,
  ADD_NEXT_QUESTION,
  CLEAR_VALUES,
  SET_QUESTION,
  SEND_ERROR,
  CLEAR_ERROR
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
    case SET_QUESTION:
      return {
        ...state,
        question: action.question
      };
    case SET_ANSWER:
      let ans = state.answers;
      ans[action.index] = action.value;
      return {
        ...state,
        answers: ans
      };
    case ADD_NEXT_QUESTION:
      let correct_answer = state.answers[action.correct];
      let incorrect_answers = state.answers.filter(
        (answer, index) => index !== state.correct_answer
      );
      return {
        ...state,
        questions: [
          ...state.questions,
          {
            question: action.question,
            correct_answer,
            incorrect_answers
          }
        ],
        question: "",
        correct_answer: null,
        incorrect_answers: [],
        answers: []
      };
    case SEND_ERROR:
      return {
        ...state,
        error:
          "Plese don't leave empty and add something for the requirement places"
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: ""
      };
    default:
      return state;
  }
};
