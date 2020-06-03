import axios from "../../../axios-orders";
import {
  ACTION_ADD_NEW_ANSWER,
  ACTION_ADD_QUIZ_INFORMATION,
  ACTION_ADD_QUIZ_QUESTION,
  ACTION_CHANGE_CREATE_QUIZ_CATEGORY,
  ACTION_CHANGE_CREATE_QUIZ_DESCRIPTION,
  ACTION_CHANGE_CREATE_QUIZ_DIFFICULTY,
  ACTION_CHANGE_CREATE_QUIZ_TITLE,
  ACTION_CHANGE_CREATE_QUIZ_TYPE,
  ACTION_CLEAR_ERROR,
  ACTION_GET_IMAGE_INFORMATION,
  ACTION_PREVIOUS_QUESTION,
  ACTION_PREVIOUS_QUIZ_INFORMATION,
  ACTION_SAVE_QUIZ,
  ACTION_SEND_ERROR,
  ACTION_SET_ANSWER,
  ACTION_SET_CLEAR_CREATE_QUIZ,
  ACTION_SET_QUESTION,
  ACTION_TRUE_OR_FALSE_ACTION,
} from "../../types";

const initialState = {
  answers: [],
  correct_answer: null,
  error: "",
  imageInformation: null,
  incorrect_answers: [],
  question: "",
  questions: [],
  quizes: [],
  quiz: null,
  quiz_category: "General",
  quiz_description: "",
  quiz_difficulty: "easy",
  quiz_title: "",
  quiz_type: "Multiple",
};

export const create = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_ADD_NEW_ANSWER:
      return {
        ...state,
        answers: [...state.answers, ""],
      };

    case ACTION_ADD_QUIZ_INFORMATION:
      return {
        ...state,
        quiz: "Active",
      };

    case ACTION_ADD_QUIZ_QUESTION:
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

    case ACTION_CHANGE_CREATE_QUIZ_CATEGORY:
      return {
        ...state,
        quiz_category: action.value,
      };

    case ACTION_CHANGE_CREATE_QUIZ_DESCRIPTION:
      return {
        ...state,
        quiz_description: action.value,
      };

    case ACTION_CHANGE_CREATE_QUIZ_DIFFICULTY:
      return {
        ...state,
        quiz_difficulty: action.value,
      };

    case ACTION_CHANGE_CREATE_QUIZ_TITLE:
      return {
        ...state,
        quiz_title: action.value,
      };

    case ACTION_CHANGE_CREATE_QUIZ_TYPE:
      return {
        ...state,
        quiz_type: action.value,
      };

    case ACTION_CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };

    case ACTION_GET_IMAGE_INFORMATION:
      return {
        ...state,
        imageInformation: action.imageData,
      };

    case ACTION_PREVIOUS_QUESTION:
      return {
        ...state,
        question: action.question,
        answers: action.answers,
        correct_answer: action.correct,
        questions: state.questions.filter(
          (question) => question.question !== action.question
        ),
      };

    case ACTION_PREVIOUS_QUIZ_INFORMATION:
      return {
        ...state,
        quiz: null,
        quiz_title: action.quiz_title,
        quiz_desription: action.quiz_desription,
        quiz_category: action.quiz_category,
        quiz_type: action.quiz_type,
        quiz_difficulty: action.quiz_difficulty,
      };

    case ACTION_SAVE_QUIZ:
      axios.post("/quiz/add-quiz", {
        imageInformation: action.imageInformation,
        quizTitle: action.quiz_title,
        quizDescription: action.quiz_description,
        quizCategory: action.quiz_category,
        quizType: action.quiz_type,
        quizDifficulty: action.quiz_difficulty,
        quizQuestions: state.questions,
      });
      axios.put("/users", {
        totalPoint: state.questions.length,
      });
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

    case ACTION_SEND_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case ACTION_SET_ANSWER:
      let ans = state.answers;
      ans[action.index] = action.value;
      return {
        ...state,
        answers: ans,
      };

    case ACTION_SET_CLEAR_CREATE_QUIZ:
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

    case ACTION_SET_QUESTION:
      return {
        ...state,
        question: action.question,
      };

    case ACTION_TRUE_OR_FALSE_ACTION:
      return {
        ...state,
        correct_answer: action.payload,
      };

    default:
      return state;
  }
};
