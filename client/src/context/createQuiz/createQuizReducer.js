import {
  ADD_NEW_ANSWER,
  ADD_QUIZ_INFORMATION,
  ADD_QUIZ_QUESTION,
  CHANGE_CREATE_QUIZ_CATEGORY,
  CHANGE_CREATE_QUIZ_DESCRIPTION,
  CHANGE_CREATE_QUIZ_DIFFICULTY,
  CHANGE_CREATE_QUIZ_TITLE,
  CHANGE_CREATE_QUIZ_TYPE,
  CLEAR_ERROR,
  GET_IMAGE_INFORMATION,
  PREVIOUS_QUESTION,
  PREVIOUS_QUIZ_INFORMATION,
  SAVE_QUIZ,
  SEND_ERROR,
  SET_ANSWER,
  SET_CLEAR_CREATE_QUIZ,
  SET_QUESTION,
  TRUE_OR_FALSE_ACTION,
} from "../actionTypes";
import axios from "../../axios-orders";

const config = {
  header: {
    "Content-type": "application/json",
  },
};

export default (state, action) => {
  switch (action.type) {
    case ADD_NEW_ANSWER:
      return {
        ...state,
        answers: [...state.answers, ""],
      };

    case ADD_QUIZ_INFORMATION:
      return {
        ...state,
        quiz: "Active",
      };

    case ADD_QUIZ_QUESTION:
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
            incorrect_answers,
            correct: action.correct,
          },
        ],
        question: "",
        correct_answer: null,
        incorrect_answers: [],
        answers: [],
      };

    case CHANGE_CREATE_QUIZ_CATEGORY:
      return {
        ...state,
        quiz_category: action.value,
      };

    case CHANGE_CREATE_QUIZ_DESCRIPTION:
      return {
        ...state,
        quiz_description: action.value,
      };

    case CHANGE_CREATE_QUIZ_DIFFICULTY:
      return {
        ...state,
        quiz_difficulty: action.value,
      };

    case CHANGE_CREATE_QUIZ_TITLE:
      return {
        ...state,
        quiz_title: action.value,
      };

    case CHANGE_CREATE_QUIZ_TYPE:
      return {
        ...state,
        quiz_type: action.value,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };

    case GET_IMAGE_INFORMATION:
      return {
        ...state,
        imageInformation: action.imageData,
      };

    case PREVIOUS_QUESTION:
      return {
        ...state,
        question: action.question,
        answers: action.answers,
        correct_answer: action.correct,
        questions: state.questions.filter(
          (question) => question.question !== action.question
        ),
      };

    case PREVIOUS_QUIZ_INFORMATION:
      return {
        ...state,
        quiz: null,
        quiz_title: action.quiz_title,
        quiz_desription: action.quiz_desription,
        quiz_category: action.quiz_category,
        quiz_type: action.quiz_type,
        quiz_difficulty: action.quiz_difficulty,
      };

    case SAVE_QUIZ:
      axios.post(
        "/quiz/add-quiz",
        {
          imageInformation: action.imageInformation,
          quizTitle: action.quiz_title,
          quizDescription: action.quiz_description,
          quizCategory: action.quiz_category,
          quizType: action.quiz_type,
          quizDifficulty: action.quiz_difficulty,
          quizQuestions: state.questions,
        },
        config
      );
      axios.put(
        "/users",
        {
          totalPoint: state.questions.length,
        },
        config
      );
      return {
        ...state,
        quiz: null,
        imageInformation: null,
        questions: [],
        quiz_title: "",
        quiz_description: "",
        quiz_category: "General",
        quiz_type: "Multiple",
        quiz_difficulty: "easy",
      };

    case SEND_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case SET_ANSWER:
      let ans = state.answers;
      ans[action.index] = action.value;
      return {
        ...state,
        answers: ans,
      };

    case SET_CLEAR_CREATE_QUIZ:
      return {
        ...state,
        quiz: null,
        quiz_title: "",
        quiz_description: "",
        quiz_category: "General",
        quiz_type: "Multiple",
        quiz_difficulty: "easy",
        question: "",
        correct_answer: null,
        imageInformation: null,
        incorrect_answers: [],
        answers: [],
      };

    case SET_QUESTION:
      return {
        ...state,
        question: action.question,
      };

    case TRUE_OR_FALSE_ACTION:
      return {
        ...state,
        correct_answer: action.payload,
      };

    default:
      return state;
  }
};
