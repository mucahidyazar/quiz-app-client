import {
  ADD_QUIZ_INFORMATION,
  ADD_QUIZ_QUESTION,
  SAVE_QUIZ,
  CHANGE_CREATE_QUIZ_TITLE,
  CHANGE_CREATE_QUIZ_DESCRIPTION,
  CHANGE_CREATE_QUIZ_CATEGORY,
  CHANGE_CREATE_QUIZ_TYPE,
  CHANGE_CREATE_QUIZ_DIFFICULTY,
  ADD_NEW_ANSWER,
  TRUE_OR_FALSE_ACTION,
  SET_ANSWER,
  SET_QUESTION,
  SEND_ERROR,
  CLEAR_ERROR,
  PREVIOUS_QUESTION,
  PREVIOUS_QUIZ_INFORMATION,
  SET_CLEAR_CREATE_QUIZ
} from "../actionTypes";
import axios from "axios";

const config = {
  header: {
    "Content-type": "application/json"
  }
};

export default (state, action) => {
  switch (action.type) {
    case CHANGE_CREATE_QUIZ_TITLE:
      return {
        ...state,
        quiz_title: action.value
      };
    case CHANGE_CREATE_QUIZ_DESCRIPTION:
      return {
        ...state,
        quiz_description: action.value
      };
    case CHANGE_CREATE_QUIZ_CATEGORY:
      return {
        ...state,
        quiz_category: action.value
      };
    case CHANGE_CREATE_QUIZ_TYPE:
      return {
        ...state,
        quiz_type: action.value
      };
    case CHANGE_CREATE_QUIZ_DIFFICULTY:
      return {
        ...state,
        quiz_difficulty: action.value
      };

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
    case PREVIOUS_QUESTION:
      return {
        ...state,
        question: action.question,
        answers: action.answers,
        correct_answer: action.correct,
        questions: state.questions.filter(
          question => question.question !== action.question
        )
      };
    case PREVIOUS_QUIZ_INFORMATION:
      console.log("a111111111111");
      return {
        ...state,
        quiz: null,
        quiz_title: action.quiz_title,
        quiz_desription: action.quiz_desription,
        quiz_category: action.quiz_category,
        quiz_type: action.quiz_type,
        quiz_difficulty: action.quiz_difficulty
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
        incorrect_answers: [],
        answers: []
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
            correct: action.correct
          }
        ],
        question: "",
        correct_answer: null,
        incorrect_answers: [],
        answers: []
      };
    case ADD_QUIZ_INFORMATION:
      return {
        ...state,
        quiz: "Active"
      };
    case SAVE_QUIZ:
      // const quiz = {
      //   quiz_title: action.quiz_title,
      //   quiz_description: action.quiz_description,
      //   quiz_category: action.quiz_category,
      //   quiz_type: action.quiz_type,
      //   quiz_difficulty: action.quiz_difficulty,
      //   questions: state.questions
      // };
      axios.post(
        "/quiz/add-quiz",
        {
          quizTitle: action.quiz_title,
          quizDescription: action.quiz_description,
          quizCategory: action.quiz_category,
          quizType: action.quiz_type,
          quizDifficulty: action.quiz_difficulty,
          quizQuestions: state.questions
        },
        config
      );
      axios.put(
        "/users",
        {
          totalPoint: state.questions.length
        },
        config
      );
      return {
        ...state,
        quiz: null,
        questions: [],
        quiz_title: "",
        quiz_description: "",
        quiz_category: "General",
        quiz_type: "Multiple",
        quiz_difficulty: "easy"
      };
    case SEND_ERROR:
      return {
        ...state,
        error: action.error
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
