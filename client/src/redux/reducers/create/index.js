import axios from "../../../axios-orders";
import {
  ADD_INFORMATION,
  ADD_IMAGE,
  CLEAR_ERROR,
  SET_STEP,
  TEMPLATE_QUESTION,
  TEMPLATE_ANSWERS,
  CHOOSE_ANSWER,
  SAVE_QUIZ,
  GET_QUIZ,
  ////
  SEND_ERROR,
  SHOW_ERROR,
  //
  ACTION_ADD_NEW_ANSWER,
  ACTION_ADD_QUIZ_QUESTION,
  ACTION_CHANGE_CREATE_QUIZ_CATEGORY,
  ACTION_CHANGE_CREATE_QUIZ_DESCRIPTION,
  ACTION_CHANGE_CREATE_QUIZ_DIFFICULTY,
  ACTION_CHANGE_CREATE_QUIZ_TITLE,
  ACTION_CHANGE_CREATE_QUIZ_TYPE,
  GET_IMAGE,
  ACTION_PREVIOUS_QUESTION,
  ACTION_PREVIOUS_QUIZ_INFORMATION,
  ACTION_SAVE_QUIZ,
  ACTION_SET_ANSWER,
  ACTION_SET_CLEAR_CREATE_QUIZ,
  ACTION_SET_QUESTION,
  ACTION_TRUE_OR_FALSE_ACTION,
  NEW_ANSWER,
} from "../../types";
import { templateQuestion } from "../../actions";

const initialState = {
  step: 1,
  quiz: {
    avatar: null,
    quizCategory: "General",
    quizType: "multiple",
    quizDifficulty: "easy",
    quizTitle: null,
    quizDescription: null,
    quizQuestions: [
      {
        question: null,
        answers: [
          {
            value: "",
            answer: false,
          },
        ],
      },
    ],
  },
  quizError: null,
  selectedQuiz: null,
};

export const create = (state = initialState, action) => {
  const questions = [...state.quiz.quizQuestions];

  switch (action.type) {
    // case ACTION_ADD_NEW_ANSWER:
    //   return {
    //     ...state,
    //     answers: [...state.answers, ""],
    //   };

    case ADD_INFORMATION:
      console.log(action);
      return {
        ...state,
        quiz: {
          ...state.quiz,
          quizCategory: "general",
          quizType: "multiple",
          quizDifficulty: "easy",
          ...action.value,
        },
      };

    case ADD_IMAGE:
      return {
        ...state,
        quiz: {
          ...state.quiz,
          quizImage: action.imageData,
        },
      };

    case CLEAR_ERROR:
      return {
        ...state,
        quizError: "",
      };

    case SET_STEP:
      if (state.step < 2) {
        return {
          ...state,
          step: state.step + action.value,
        };
      } else if (
        state.step > 1 &&
        (state.quiz.quizQuestions[state.step - 2].question === "" ||
          state.quiz.quizQuestions[state.step - 2].answers.some(
            (item) => item.value === ""
          ))
      ) {
        return {
          ...state,
          quizError: "Please do not let empty any area",
        };
      } else if (
        action.value === -1 &&
        state.quiz.quizQuestions[state.step - 2]
      ) {
        return {
          ...state,
          step: state.step + action.value,
        };
      } else if (
        action.value === 1 &&
        state.quiz.quizQuestions[state.step - 2].question !==
          state.quiz.quizQuestions[state.quiz.quizQuestions.length - 1].question
      ) {
        return {
          ...state,
          step: state.step + action.value,
        };
      } else {
        return {
          ...state,
          quiz: {
            ...state.quiz,
            quizQuestions: [
              ...state.quiz.quizQuestions,
              {
                question: null,
                answers: [
                  {
                    value: "",
                    answer: false,
                  },
                ],
              },
            ],
          },
          quizError: null,
          step: state.step + action.value,
        };
      }

    case SHOW_ERROR:
      return {
        ...state,
        quizError: action.error,
      };

    case TEMPLATE_QUESTION:
      questions[state.step - 2].question = action.value;
      return {
        ...state,
        quiz: {
          ...state.quiz,
          quizQuestions: questions,
        },
      };

    case TEMPLATE_ANSWERS:
      questions[state.step - 2].answers[action.index].value = action.value;
      return {
        ...state,
        quiz: {
          ...state.quiz,
          quizQuestions: questions,
        },
      };

    case NEW_ANSWER:
      questions[state.step - 2].answers.push({
        value: "",
        answer: false,
      });
      return {
        ...state,
        quiz: {
          ...state.quiz,
          quizQuestions: questions,
        },
      };
    case CHOOSE_ANSWER:
      questions[state.step - 2].answers[action.index].answer = !questions[
        state.step - 2
      ].answers[action.index].answer;
      return {
        ...state,
        quiz: {
          ...state.quiz,
          quizQuestions: questions,
        },
      };

    case SAVE_QUIZ:
      return {
        ...state,
        step: 1,
        quiz: {
          avatar: null,
          quizCategory: "General",
          quizType: "multiple",
          quizDifficulty: "easy",
          quizTitle: null,
          quizDescription: null,
          quizQuestions: [
            {
              question: null,
              answers: [
                {
                  value: "",
                  answer: false,
                },
              ],
            },
          ],
        },
        quizError: null,
      };

    case GET_QUIZ:
      return {
        ...state,
        selectedQuiz: action.quiz,
      };
    // case ACTION_ADD_QUIZ_QUESTION:
    //   let correct_answer = state.answers[action.correct];
    //   let incorrect_answers = state.answers.filter(
    //     (answer, index) => index !== state.correct_answer
    //   );
    //   return {
    //     ...state,
    //     questions: [
    //       ...state.questions,
    //       {
    //         question: action.question,
    //         correct_answer,
    //         incorrect_answers,
    //         correct: action.correct,
    //       },
    //     ],
    //     question: "",
    //     correct_answer: null,
    //     incorrect_answers: [],
    //     answers: [],
    //   };

    // case ACTION_CHANGE_CREATE_QUIZ_CATEGORY:
    //   return {
    //     ...state,
    //     quiz_category: action.value,
    //   };

    // case ACTION_CHANGE_CREATE_QUIZ_DESCRIPTION:
    //   return {
    //     ...state,
    //     quiz_description: action.value,
    //   };

    // case ACTION_CHANGE_CREATE_QUIZ_DIFFICULTY:
    //   return {
    //     ...state,
    //     quiz_difficulty: action.value,
    //   };

    // case ACTION_CHANGE_CREATE_QUIZ_TITLE:
    //   return {
    //     ...state,
    //     quiz_title: action.value,
    //   };

    // case ACTION_CHANGE_CREATE_QUIZ_TYPE:
    //   return {
    //     ...state,
    //     quiz_type: action.value,
    //   };

    case CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };

    // case ACTION_PREVIOUS_QUESTION:
    //   return {
    //     ...state,
    //     question: action.question,
    //     answers: action.answers,
    //     correct_answer: action.correct,
    //     questions: state.questions.filter(
    //       (question) => question.question !== action.question
    //     ),
    //   };

    // case ACTION_PREVIOUS_QUIZ_INFORMATION:
    //   return {
    //     ...state,
    //     quiz: null,
    //     quiz_title: action.quiz_title,
    //     quiz_desription: action.quiz_desription,
    //     quiz_category: action.quiz_category,
    //     quiz_type: action.quiz_type,
    //     quiz_difficulty: action.quiz_difficulty,
    //   };

    // case ACTION_SAVE_QUIZ:
    //   axios.post("/quiz/add-quiz", {
    //     imageInformation: action.imageInformation,
    //     quizTitle: action.quiz_title,
    //     quizDescription: action.quiz_description,
    //     quizCategory: action.quiz_category,
    //     quizType: action.quiz_type,
    //     quizDifficulty: action.quiz_difficulty,
    //     quizQuestions: state.questions,
    //   });
    //   axios.put("/users", {
    //     totalPoint: state.questions.length,
    //   });
    //   return {
    //     ...state,
    //     quiz: null,
    //     imageInformation: null,
    //     questions: [],
    //     quiz_title: "",
    //     quiz_description: "",
    //     quiz_category: "General",
    //     quiz_type: "Multiple",
    //     quiz_difficulty: "easy",
    //   };

    case SEND_ERROR:
      return {
        ...state,
        error: action.error,
      };

    // case ACTION_SET_ANSWER:
    //   let ans = state.answers;
    //   ans[action.index] = action.value;
    //   return {
    //     ...state,
    //     answers: ans,
    //   };

    // case ACTION_SET_CLEAR_CREATE_QUIZ:
    //   return {
    //     ...state,
    //     quiz: null,
    //     quiz_title: "",
    //     quiz_description: "",
    //     quiz_category: "General",
    //     quiz_type: "Multiple",
    //     quiz_difficulty: "easy",
    //     question: "",
    //     correct_answer: null,
    //     imageInformation: null,
    //     incorrect_answers: [],
    //     answers: [],
    //   };

    // case ACTION_SET_QUESTION:
    //   return {
    //     ...state,
    //     question: action.question,
    //   };

    // case ACTION_TRUE_OR_FALSE_ACTION:
    //   return {
    //     ...state,
    //     correct_answer: action.payload,
    //   };

    default:
      return state;
  }
};
