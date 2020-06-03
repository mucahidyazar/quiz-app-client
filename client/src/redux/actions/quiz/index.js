import axios from "../../../axios-orders";
import {
  ACTION_GET_QUIZES,
  ACTION_GET_QUIZ_SCOREBOARD,
  ACTION_GET_USER_QUIZES,
  ACTION_SET_QUIZ_DIFFICUTY,
  ACTION_SET_VALID_QUIZES,
  ACTION_SEARCH_QUIZES,
  ACTION_SORT_QUIZES,
} from "../../types";

export const deleteQuiz = (quizId) => {
  try {
    axios.delete(`/quiz/${quizId}`);
    getQuizes();
  } catch (err) {
    console.error(err);
  }
};

export const getQuizes = () => {
  return async (dispatch) => {
    const quizes = await axios.get("quizes");
    dispatch({
      type: ACTION_GET_QUIZES,
      quizes: quizes.data,
    });
  };
};

export const getQuizScoreboard = (quizScoreboard) => ({
  type: ACTION_GET_QUIZ_SCOREBOARD,
  quizScoreboard,
});

export const getUserQuizes = (id) => {
  return async (dispatch) => {
    try {
      const userQuizes = await axios.get(`/quizes/${id}`);
      dispatch({
        type: ACTION_GET_USER_QUIZES,
        userQuizes: userQuizes.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const searchQuizes = (value) => ({
  type: ACTION_SEARCH_QUIZES,
  value,
});

export const setQuizDifficulty = (difficult) => ({
  type: ACTION_SET_QUIZ_DIFFICUTY,
  difficult,
});

export const setValidQuizes = (quizes) => ({
  type: ACTION_SET_VALID_QUIZES,
  quizes,
});

export const sortQuizes = (by) => ({
  type: ACTION_SORT_QUIZES,
  by,
});
