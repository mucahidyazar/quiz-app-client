import React, { useReducer } from "react";
import createQuizReducer from "./createQuizReducer";
import createQuizContext from "./createQuizContext";
import {
  ADD_QUIZ_QUESTION,
  ADD_QUIZ_INFORMATION,
  SAVE_QUIZ,
  ADD_QUIZ,
  CHANGE_CREATE_QUIZ_TITLE,
  CHANGE_CREATE_QUIZ_DESCRIPTION,
  CHANGE_CREATE_QUIZ_CATEGORY,
  CHANGE_CREATE_QUIZ_TYPE,
  CHANGE_CREATE_QUIZ_DIFFICULTY,
  ADD_NEW_ANSWER,
  TRUE_OR_FALSE_ACTION,
  SET_QUESTION,
  SET_ANSWER,
  CLEAR_VALUES,
  SEND_ERROR,
  CLEAR_ERROR,
  PREVIOUS_QUESTION,
  PREVIOUS_QUIZ_INFORMATION
} from "../actionTypes";

const CreateQuizState = props => {
  const initialState = {
    quizes: [],
    quiz: null,
    quiz_title: "",
    quiz_description: "",
    quiz_category: "General",
    quiz_type: "Multiple",
    quiz_difficulty: "easy",
    questions: [],
    question: "",
    correct_answer: null,
    incorrect_answers: [],
    answers: [],
    error: ""
  };
  const [state, dispatch] = useReducer(createQuizReducer, initialState);

  const changeCreateQuizTitle = value => {
    try {
      dispatch({
        type: CHANGE_CREATE_QUIZ_TITLE,
        value
      });
    } catch (err) {
      console.log(err);
    }
  };
  const changeCreateQuizDescription = value => {
    try {
      dispatch({
        type: CHANGE_CREATE_QUIZ_DESCRIPTION,
        value
      });
    } catch (err) {
      console.log(err);
    }
  };
  const changeCreateQuizCategory = value => {
    try {
      dispatch({
        type: CHANGE_CREATE_QUIZ_CATEGORY,
        value
      });
    } catch (err) {
      console.log(err);
    }
  };
  const changeCreateQuizType = value => {
    try {
      dispatch({
        type: CHANGE_CREATE_QUIZ_TYPE,
        value
      });
    } catch (err) {
      console.log(err);
    }
  };
  const changeCreateQuizDifficulty = value => {
    try {
      dispatch({
        type: CHANGE_CREATE_QUIZ_DIFFICULTY,
        value
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addNewAnswer = () => {
    try {
      dispatch({
        type: ADD_NEW_ANSWER
      });
    } catch (err) {
      console.error(err);
    }
  };

  const trueOrFalseAction = index => {
    dispatch({
      type: TRUE_OR_FALSE_ACTION,
      payload: index
    });
  };

  const setQuestion = question => {
    dispatch({
      type: SET_QUESTION,
      question
    });
  };

  const setAnswer = (value, index) => {
    dispatch({
      type: SET_ANSWER,
      value,
      index
    });
  };

  const previousQuestion = () => {
    if (state.questions.length > 0) {
      const prevQuestionObject = state.questions[state.questions.length - 1];
      const prevQuestion = prevQuestionObject.question;
      const prevAnswersArray = prevQuestionObject.incorrect_answers;
      const prevCorrectAnswer = prevQuestionObject.correct_answer;
      const prevCorrect = prevQuestionObject.correct;

      prevAnswersArray.splice(prevCorrect, 0, prevCorrectAnswer);
      try {
        dispatch({
          type: PREVIOUS_QUESTION,
          question: prevQuestion,
          answers: prevAnswersArray,
          correct: prevCorrect
        });
      } catch (err) {
        console.error(err);
      }
    } else if (state.questions.length <= 0) {
      try {
        dispatch({
          type: PREVIOUS_QUIZ_INFORMATION,
          quiz_title: state.quiz_title,
          quiz_description: state.quiz_description,
          quiz_category: state.quiz_category,
          quiz_type: state.quiz_type,
          quiz_difficulty: state.quiz_difficulty
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const isAnswerCorrect = () => state.answers.some(answer => answer === "");

  const addQuizQuestion = (question, answers, correct) => {
    if (
      question === "" ||
      question === null ||
      answers.length === 0 ||
      correct === null ||
      isAnswerCorrect() === true
    ) {
      sendError(
        "Plese don't leave empty and add something for the requirement places"
      );
    } else {
      dispatch({
        type: ADD_QUIZ_QUESTION,
        question,
        answers,
        correct
      });
      clearValues();
    }
  };

  const addQuizInformation = (
    title,
    description,
    category,
    type,
    difficulty
  ) => {
    try {
      if (
        title === "" ||
        description === "" ||
        category === "" ||
        type === "" ||
        difficulty === ""
      ) {
        sendError(
          "Plese don't leave empty and add something for the requirement places"
        );
      } else {
        dispatch({
          type: ADD_QUIZ_INFORMATION
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveQuiz = (
    quiz_title,
    quiz_description,
    quiz_category,
    quiz_type,
    quiz_difficulty
  ) => {
    addQuizQuestion(state.question, state.answers, state.correct);
    try {
      dispatch({
        type: SAVE_QUIZ,
        quiz_title,
        quiz_description,
        quiz_category,
        quiz_type,
        quiz_difficulty
      });
    } catch (err) {
      console.error(err);
    }
  };

  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES
    });
  };

  const sendError = error => {
    dispatch({
      type: SEND_ERROR,
      error
    });
    setTimeout(() => {
      dispatch({
        type: CLEAR_ERROR
      });
    }, 3000);
  };

  return (
    <createQuizContext.Provider
      value={{
        quizes: state.quizes,
        quiz: state.quiz,
        quiz_title: state.quiz_title,
        quiz_description: state.quiz_description,
        quiz_category: state.quiz_category,
        quiz_type: state.quiz_type,
        quiz_difficulty: state.quiz_difficulty,
        correct_answer: state.correct_answer,
        incorrect_answers: state.incorrect_answers,
        answers: state.answers,
        question: state.question,
        questions: state.questions,
        error: state.error,
        previousQuestion,
        addQuizInformation,
        addQuizQuestion,
        saveQuiz,
        changeCreateQuizTitle,
        changeCreateQuizDescription,
        changeCreateQuizCategory,
        changeCreateQuizType,
        changeCreateQuizDifficulty,
        addNewAnswer,
        trueOrFalseAction,
        setQuestion,
        setAnswer
      }}
    >
      {props.children}
    </createQuizContext.Provider>
  );
};

export default CreateQuizState;