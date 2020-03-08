import React, { useReducer } from "react";
import axios from "../../axios-orders";
import quizesContext from "./quizesContext";
import quizesReducer from "./quizesReducer";
import {
  GET_QUIZES,
  GET_USER_QUIZES,
  GET_QUIZ_SCOREBOARD,
  SEARCH_QUIZES,
  SET_VALID_QUIZES,
  SORT_QUIZES_BY_DATE,
  SORT_QUIZES_BY_QUESTION,
  SORT_QUIZES_BY_TITLE
} from "../actionTypes";

const QuizesState = props => {
  const initialState = {
    countdown: 60,
    disabledTime: false,
    disabledTwoOff: false,
    quizes: null,
    quizesLoading: true,
    searchedQuizes: null,
    sortedQuizes: null,
    specialQuizScoreboard: null,
    userQuizes: null,
    validQuizes: null
  };

  const [state, dispatch] = useReducer(quizesReducer, initialState);

  const deleteQuiz = id => {
    try {
      axios.delete(`/quiz/${id}`);
      getQuizes();
    } catch (err) {
      console.error(err);
    }
  };

  //getQuizes
  const getQuizes = async () => {
    try {
      const quizes = await axios.get("/quizes");
      dispatch({
        type: GET_QUIZES,
        quizes: quizes.data
      });
    } catch (err) {
      console.error(err);
    }
  };

  //getUserQuizes
  const getUserQuizes = async id => {
    try {
      const userQuizes = await axios.get(`/quizes/${id}`);
      dispatch({
        type: GET_USER_QUIZES,
        userQuizes: userQuizes.data
      });
    } catch (err) {
      console.error(err);
    }
  };

  //getQuizScoreBoard
  const getQuizScoreboard = quizScoreboard => {
    dispatch({
      type: GET_QUIZ_SCOREBOARD,
      quizScoreboard
    });
  };

  //searchQuizes
  const searchQuizes = key => {
    dispatch({
      type: SEARCH_QUIZES,
      key
    });
  };

  //setValidQuizes
  const setValidQuizes = quizes => {
    dispatch({
      type: SET_VALID_QUIZES,
      quizes
    });
  };

  //sortQuizesByDate
  const sortQuizesByDate = () => {
    dispatch({
      type: SORT_QUIZES_BY_DATE
    });
  };

  //sortQuizesByQuestion
  const sortQuizesByQuestion = () => {
    dispatch({
      type: SORT_QUIZES_BY_QUESTION
    });
  };

  //sortQuizesByTitle
  const sortQuizesByTitle = () => {
    dispatch({
      type: SORT_QUIZES_BY_TITLE
    });
  };

  return (
    <quizesContext.Provider
      value={{
        //COMMON
        quizes: state.quizes,
        searchedQuizes: state.searchedQuizes,
        sortedQuizes: state.sortedQuizes,
        specialQuizScoreboard: state.specialQuizScoreboard,
        userQuizes: state.userQuizes,
        validQuizes: state.validQuizes,
        deleteQuiz,
        getQuizes,
        getQuizScoreboard,
        getUserQuizes,
        setValidQuizes,
        searchQuizes,
        sortQuizesByDate,
        sortQuizesByQuestion,
        sortQuizesByTitle
      }}
    >
      {props.children}
    </quizesContext.Provider>
  );
};

export default QuizesState;
