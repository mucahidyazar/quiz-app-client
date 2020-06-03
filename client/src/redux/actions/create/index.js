// import axios from "../../axios-orders";
// import {
//   ACTION_ADD_NEW_ANSWER,
//   ACTION_ADD_QUIZ_INFORMATION,
//   ACTION_ADD_QUIZ_QUESTION,
//   ACTION_CHANGE_CREATE_QUIZ_CATEGORY,
//   ACTION_CHANGE_CREATE_QUIZ_DESCRIPTION,
//   ACTION_CHANGE_CREATE_QUIZ_DIFFICULTY,
//   ACTION_CHANGE_CREATE_QUIZ_TITLE,
//   ACTION_CHANGE_CREATE_QUIZ_TYPE,
//   ACTION_CLEAR_ERROR,
//   ACTION_CLEAR_VALUES,
//   ACTION_GET_IMAGE_INFORMATION,
//   ACTION_PREVIOUS_QUESTION,
//   ACTION_PREVIOUS_QUIZ_INFORMATION,
//   ACTION_SAVE_QUIZ,
//   ACTION_SEND_ERROR,
//   ACTION_SET_ANSWER,
//   ACTION_SET_CLEAR_CREATE_QUIZ,
//   ACTION_SET_QUESTION,
//   ACTION_TRUE_OR_FALSE_ACTION,
// } from "../../types";

// export const addImage = async (data, photoType) => {
//   const datas = await axios.post("/upload-image", data, photoType, {});

//   if (photoType === "profile-photo") {
//     await axios.post("/users/image", datas.data, {});
//   } else {
//     getImageInformation(datas.data);
//   }
// };

// export const addNewAnswer = () => ({
//   type: ACTION_ADD_NEW_ANSWER,
// });

// export const addQuizInformation = (
//   title,
//   description,
//   category,
//   type,
//   difficulty
// ) => {
//   (dispatch) => {
//     if (
//       title === "" ||
//       description === "" ||
//       category === "" ||
//       type === "" ||
//       difficulty === ""
//     ) {
//       sendError(
//         "Plese don't leave empty and add something for the requirement places"
//       );
//     } else {
//       dispatch({
//         type: ACTION_ADD_QUIZ_INFORMATION,
//       });
//     }
//   };
// };

// export const addQuizQuestion = (question, answers, correct) => {
//   (dispatch) => {
//     dispatch({
//       type: ACTION_ADD_QUIZ_QUESTION,
//       question,
//       answers,
//       correct,
//     });
//     clearValues();
//   };
// };

// export const changeCreateQuizCategory = (value) => ({
//   type: ACTION_CHANGE_CREATE_QUIZ_CATEGORY,
//   value,
// });

// export const changeCreateQuizDescription = (value) => ({
//   type: ACTION_CHANGE_CREATE_QUIZ_DESCRIPTION,
//   value,
// });

// export const changeCreateQuizDifficulty = (value) => ({
//   type: ACTION_CHANGE_CREATE_QUIZ_DIFFICULTY,
//   value,
// });

// export const changeCreateQuizTitle = (value) => ({
//   type: ACTION_CHANGE_CREATE_QUIZ_TITLE,
//   value,
// });

// export const changeCreateQuizType = (value) => ({
//   type: ACTION_CHANGE_CREATE_QUIZ_TYPE,
//   value,
// });

// export const sendError = (error) => {
//   (dispatch) => {
//     dispatch({
//       type: ACTION_SEND_ERROR,
//       error,
//     });
//     setTimeout(() => {
//       dispatch({
//         type: ACTION_CLEAR_ERROR,
//       });
//     }, 3000);
//   };
// };

// export const clearValues = () => ({
//   type: ACTION_CLEAR_VALUES,
// });

// export const getImageInformation = (imageData) => ({
//   type: ACTION_GET_IMAGE_INFORMATION,
//   imageData,
// });

// export const previousQuestion = () => {
//   (dispatch) => {
//     if (state.questions.length > 0) {
//       const prevQuestionObject = state.questions[state.questions.length - 1];
//       const prevQuestion = prevQuestionObject.question;
//       const prevAnswersArray = prevQuestionObject.incorrect_answers;
//       const prevCorrectAnswer = prevQuestionObject.correct_answer;
//       const prevCorrect = prevQuestionObject.correct;
//       prevAnswersArray.splice(prevCorrect, 0, prevCorrectAnswer);

//       dispatch({
//         type: ACTION_PREVIOUS_QUESTION,
//         question: prevQuestion,
//         answers: prevAnswersArray,
//         correct: prevCorrect,
//       });
//     } else if (state.questions.length <= 0) {
//       dispatch({
//         type: ACTION_PREVIOUS_QUIZ_INFORMATION,
//         quiz_title: state.quiz_title,
//         quiz_description: state.quiz_description,
//         quiz_category: state.quiz_category,
//         quiz_type: state.quiz_type,
//         quiz_difficulty: state.quiz_difficulty,
//       });
//     }
//   };
// };

// export const removeAndAddImage = async (data) => {
//   axios.put("/quiz/delete-image", data, {});
// };

// export const saveQuiz = (
//   imageInformation,
//   quiz_title,
//   quiz_description,
//   quiz_category,
//   quiz_type,
//   quiz_difficulty
// ) => {
//   addQuizQuestion(state.question, state.answers, state.correct_answer);

//   dispatch({
//     type: ACTION_SAVE_QUIZ,
//     imageInformation,
//     quiz_title,
//     quiz_description,
//     quiz_category,
//     quiz_type,
//     quiz_difficulty,
//   });
// };

// export const saveScores = (trueVal, passVal, falseVal) => {
//   const data = {
//     totalSolved: trueVal + passVal + falseVal,
//     totalTrue: trueVal,
//     totalPass: passVal,
//     totalFalse: falseVal,
//   };
//   axios.put("/users", data);
// };

// export const saveScoreToQuiz = (id, trueVal, passVal, falseVal) => {
//   const score = {
//     totalTrue: trueVal,
//     totalPass: passVal,
//     totalFalse: falseVal,
//     totalPoint: trueVal * 10,
//   };
//   axios.put(`/quiz/${id}`, score);
// };

// export const setAnswer = (value, index) => ({
//   type: ACTION_SET_ANSWER,
//   value,
//   index,
// });

// const setClearCreateQuiz = () => ({
//   type: ACTION_SET_CLEAR_CREATE_QUIZ,
// });

// const setQuestion = (question) => ({
//   type: ACTION_SET_QUESTION,
//   question,
// });

// const trueOrFalseAction = (index) => ({
//   type: ACTION_TRUE_OR_FALSE_ACTION,
//   payload: index,
// });
