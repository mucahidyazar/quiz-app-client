import React, { useReducer } from "react";
import axios from "axios";
import quizContext from "./quizContext";
import quizReducer from "./quizReducer";
import { GET_QUIZES } from "../actionTypes";

const QuizState = props => {
  const initialState = {
    quizes: null,
    quizesLoading: true,
    getQuizesError: null
  };

  const quizLinks = [
    //General Knowledge
    "https://opentdb.com/api.php?amount=10&category=9",
    //Entertainment: Books
    "https://opentdb.com/api.php?amount=10&category=10",
    //Entertainment: Films
    "https://opentdb.com/api.php?amount=10&category=11",
    //Entertainment: Music
    "https://opentdb.com/api.php?amount=10&category=12",
    //Entertainment: Musicals & Theatres
    "https://opentdb.com/api.php?amount=10&category=13"
  ];

  const [state, dispatch] = useReducer(quizReducer, initialState);

  // getQuizes
  const getQuizes = async () => {
    try {
      const quizData1 = await axios.get(quizLinks[0]);
      const quizData2 = await axios.get(quizLinks[1]);
      const quizData3 = await axios.get(quizLinks[2]);
      const quizData4 = await axios.get(quizLinks[3]);
      const quizData5 = await axios.get(quizLinks[4]);
      let quizes = [
        quizData1.data.results,
        quizData2.data.results,
        quizData3.data.results,
        quizData4.data.results,
        quizData5.data.results
      ];
      dispatch({
        type: GET_QUIZES,
        payload: quizes
      });
    } catch (err) {}
  };
  // getQuiz

  return (
    <quizContext.Provider
      value={{
        quizes: state.quizes,
        quizesLoading: state.quizesLoading,
        getQuizes
      }}
    >
      {props.children}
    </quizContext.Provider>
  );
};

export default QuizState;
