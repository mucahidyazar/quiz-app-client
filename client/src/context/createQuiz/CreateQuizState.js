import React, { useReducer } from "react";
import createQuizReducer from "./createQuizReducer";
import createQuizContext from "./createQuizContext";
import {
  ADD_NEW_ANSWER,
  TRUE_OR_FALSE_ACTION,
  SET_QUESTION,
  SET_ANSWER,
  ADD_NEXT_QUESTION,
  CLEAR_VALUES,
  SEND_ERROR,
  CLEAR_ERROR
} from "../actionTypes";

const CreateQuizState = props => {
  const initialState = {
    category: "General Knowledge",
    type: "",
    dificulty: "easy",
    questions: [],
    question: "",
    correct_answer: null,
    incorrect_answers: [],
    answers: [],
    error: ""
  };
  const [state, dispatch] = useReducer(createQuizReducer, initialState);

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

  const addNextQuestion = (question, answers, correct) => {
    if (
      question === "" ||
      question === null ||
      answers.length === 0 ||
      correct === null
    ) {
      sendError();
    } else {
      dispatch({
        type: ADD_NEXT_QUESTION,
        question,
        answers,
        correct
      });
      clearValues();
    }
  };

  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES
    });
  };

  const sendError = () => {
    dispatch({
      type: SEND_ERROR
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
        correct_answer: state.correct_answer,
        incorrect_answers: state.incorrect_answers,
        answers: state.answers,
        question: state.question,
        questions: state.questions,
        error: state.error,
        addNewAnswer,
        trueOrFalseAction,
        addNextQuestion,
        setQuestion,
        setAnswer
      }}
    >
      {props.children}
    </createQuizContext.Provider>
  );
};

export default CreateQuizState;
