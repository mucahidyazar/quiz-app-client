import React, { useReducer, useContext } from "react";
import QuizContext from "./quizContext";
import QuizReducer from "./quizReducer";

const quizContext = useContext(QuizContext);

export default function QuizState(props) {
  const initialState = {};

  const [state, dispatch] = useReducer(QuizReducer, initialState);

  return (
    <quizContext.Provider value={{}}>{props.children}</quizContext.Provider>
  );
}
