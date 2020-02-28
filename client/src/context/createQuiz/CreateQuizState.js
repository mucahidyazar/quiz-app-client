import React, { useReducer } from "react";
import axios from "axios";
import createQuizReducer from "./createQuizReducer";
import createQuizContext from "./createQuizContext";
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
  CLEAR_VALUES,
  GET_IMAGE_INFORMATION,
  PREVIOUS_QUESTION,
  PREVIOUS_QUIZ_INFORMATION,
  SAVE_QUIZ,
  SEND_ERROR,
  SET_ANSWER,
  SET_CLEAR_CREATE_QUIZ,
  SET_QUESTION,
  TRUE_OR_FALSE_ACTION
} from "../actionTypes";

const CreateQuizState = props => {
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
    quiz_type: "Multiple"
  };
  const [state, dispatch] = useReducer(createQuizReducer, initialState);

  const addImage = async (data, photoType) => {
    const datas = await axios.post("/upload-image", data, photoType, {});
    getImageInformation(datas.data);

    if (photoType === "profile-photo") {
      axios.post("/users/image", datas.data, {});
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

  //CLEAR_ERROR
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

  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES
    });
  };

  const getImageInformation = imageData => {
    dispatch({
      type: GET_IMAGE_INFORMATION,
      imageData
    });
  };

  //PREVIOUS_QUESTION && PREVIOUS_QUIZ_INFORMATION
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

  const removeAndAddImage = async data => {
    const datas = await axios.post("/upload-image", data, {});
    getImageInformation(datas.data);

    axios.put("/quiz/delete-image", datas.data, {});
  };

  const saveQuiz = (
    imageInformation,
    quiz_title,
    quiz_description,
    quiz_category,
    quiz_type,
    quiz_difficulty
  ) => {
    addQuizQuestion(state.question, state.answers, state.correct_answer);
    try {
      dispatch({
        type: SAVE_QUIZ,
        imageInformation,
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

  const saveScores = (trueVal, passVal, falseVal) => {
    const data = {
      totalSolved: trueVal + passVal + falseVal,
      totalTrue: trueVal,
      totalPass: passVal,
      totalFalse: falseVal
    };
    try {
      axios.put("/users", data);
    } catch (err) {
      console.error(err);
    }
  };

  const saveScoreToQuiz = (id, trueVal, passVal, falseVal) => {
    const score = {
      totalTrue: trueVal,
      totalPass: passVal,
      totalFalse: falseVal,
      totalPoint: trueVal * 10
    };
    try {
      axios.put(`/quiz/${id}`, score);
    } catch (err) {
      console.error(err);
    }
  };

  const setAnswer = (value, index) => {
    dispatch({
      type: SET_ANSWER,
      value,
      index
    });
  };

  const setClearCreateQuiz = () => {
    dispatch({
      type: SET_CLEAR_CREATE_QUIZ
    });
  };

  const setQuestion = question => {
    dispatch({
      type: SET_QUESTION,
      question
    });
  };

  const trueOrFalseAction = index => {
    dispatch({
      type: TRUE_OR_FALSE_ACTION,
      payload: index
    });
  };

  return (
    <createQuizContext.Provider
      value={{
        answers: state.answers,
        correct_answer: state.correct_answer,
        error: state.error,
        imageInformation: state.imageInformation,
        incorrect_answers: state.incorrect_answers,
        question: state.question,
        questions: state.questions,
        quiz: state.quiz,
        quizes: state.quizes,
        quiz_category: state.quiz_category,
        quiz_description: state.quiz_description,
        quiz_difficulty: state.quiz_difficulty,
        quiz_title: state.quiz_title,
        quiz_type: state.quiz_type,
        addImage,
        addNewAnswer,
        addQuizInformation,
        addQuizQuestion,
        changeCreateQuizCategory,
        changeCreateQuizDescription,
        changeCreateQuizDifficulty,
        changeCreateQuizTitle,
        changeCreateQuizType,
        previousQuestion,
        removeAndAddImage,
        saveQuiz,
        saveScores,
        saveScoreToQuiz,
        setAnswer,
        setClearCreateQuiz,
        setQuestion,
        trueOrFalseAction
      }}
    >
      {props.children}
    </createQuizContext.Provider>
  );
};

export default CreateQuizState;
