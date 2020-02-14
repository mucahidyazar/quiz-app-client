import React, { useReducer } from "react";
import createQuizReducer from "./createQuizReducer";
import createQuizContext from "./createQuizContext";
import {
  ADD_NEW_ANSWER,
  TRUE_OR_FALSE_ACTION,
  SET_ANSWER
} from "../actionTypes";

const CreateQuizState = props => {
  const initialState = {
    category: "General Knowledge",
    dificulty: "easy",
    question: null,
    correct_answer: null,
    incorrect_answers: [],
    answers: []
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

  const setAnswer = (value, index) => {
    dispatch({
      type: SET_ANSWER,
      value,
      index
    });
  };

  return (
    <createQuizContext.Provider
      value={{
        correct_answer: state.correct_answer,
        incorrect_answers: state.incorrect_answers,
        answers: state.answers,
        addNewAnswer,
        trueOrFalseAction,
        setAnswer
      }}
    >
      {props.children}
    </createQuizContext.Provider>
  );
};

export default CreateQuizState;
