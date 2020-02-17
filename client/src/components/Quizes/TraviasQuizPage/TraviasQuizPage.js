import React, { useState, useContext, useEffect } from "react";
import QuizesContext from "../../../context/quizes/quizesContext";

const TraviasQuizPage = props => {
  const quizesContext = useContext(QuizesContext);
  const { traviasQuizes } = quizesContext;

  useEffect(() => {
    if (traviasQuizes === null) {
      props.history.push("/quizes");
    } else {
      setCorrectAnswers(
        traviasQuizes[props.match.params.id].map(que => {
          return que.correct_answer;
        })
      );
    }

    setInterval(() => {
      setCountdown(prevSetCountDown => prevSetCountDown - 1);
    }, 1000);
  }, []);

  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [countdown, setCountdown] = useState(60);
  const [disabledTwoOff, setDisabledTwoOff] = useState(false);
  const [disabledTime, setDisabledTime] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState([]);

  let quiz = null;
  let answersArray = null;
  if (traviasQuizes === null && answersArray === null) {
    props.history.push("/quizes");
  } else {
    quiz = traviasQuizes[props.match.params.id];
    answersArray = [
      ...quiz[question].incorrect_answers,
      quiz[question].correct_answer
    ];
  }

  const corIncor = (quiz, answers) => {
    if (answers === quiz.correct_answer) {
      return "correct";
    } else {
      return "incorrect";
    }
  };

  const twoOut = () => {
    quiz = traviasQuizes[props.match.params.id];
    answersArray = [
      quiz[question].incorrect_answers[
        Math.floor(Math.random() * quiz[question].incorrect_answers.length)
      ],
      quiz[question].correct_answer
    ];
    setChosenAnswer(answersArray);
  };

  const setAnswer = (value, index) => {
    if (answers[index]) {
      setAnswers(answers.filter((answer, i) => i !== index).concat(value));
    } else {
      setAnswers([...answers, value]);
    }
  };
  const setChosen = (index, answer) => {
    if (answers[index] === answer) {
      return "chosen";
    } else {
      return "";
    }
  };

  if (countdown < 1) {
    props.history.push({
      pathname: `/result/${props.match.params.id}`,
      state: {
        answers,
        correctAnswers
      }
    });
  }

  const answerSection = () => {
    if (chosenAnswer.length > 1) {
      return chosenAnswer.map((answerArray, index) => (
        <div
          className={`section__answers ${corIncor(
            quiz[question],
            answerArray
          )} ${setChosen(question, answerArray)}`}
          key={index}
          onClick={e => setAnswer(e.target.innerHTML, question)}
        >
          {answerArray}
        </div>
      ));
    } else {
      return answersArray.map((answerArray, index) => (
        <div
          className={`section__answers ${corIncor(
            quiz[question],
            answerArray
          )} ${setChosen(question, answerArray)}`}
          key={index}
          onClick={e => setAnswer(e.target.innerHTML, question)}
        >
          {answerArray}
        </div>
      ));
    }
  };

  return traviasQuizes ? (
    <div className="section__quizpage">
      <div className="section__information">
        <div className="section__information-countdown">{countdown}</div>
      </div>
      <div className="section__question">{quiz[question].question}</div>
      <div className="section__answers">{answerSection()}</div>
      <div className="section__buttons">
        <div className="jokers">
          <button
            className={`jokers__half ${disabledTwoOff ? "disabled" : ""}`}
            disabled={disabledTwoOff}
            onClick={() => {
              twoOut();
              setDisabledTwoOff(true);
            }}
          >
            <i className="fas fa-hands-helping"></i> 2 OUT
          </button>
          <button
            className={`jokers__time ${disabledTime ? "disabled" : ""}`}
            disabled={disabledTime}
            onClick={() => {
              setCountdown(countdown + 15);
              setDisabledTime(true);
            }}
          >
            <i className="far fa-clock"></i> +15
          </button>
        </div>
        <div className="options">
          <div className="section__buttons-finish">
            <i className="fas fa-times-circle"></i> FINISH
          </div>
          <div
            className="section__buttons-next"
            onClick={() => {
              if (!answers[question]) {
                setAnswers([...answers, "PASS"]);
              }
              if (question > 8) {
                props.history.push({
                  pathname: `/result/${props.match.params.id}`,
                  state: {
                    answers,
                    correctAnswers
                  }
                });
              } else {
                setQuestion(question + 1);
                setCountdown(countdown + 15);
                setChosenAnswer([]);
              }
            }}
          >
            <i className="fas fa-arrow-circle-right"></i> NEXT
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default TraviasQuizPage;

// const validQuizes = () => {
//   if (props.match.url === `/quizes/all/${props.match.params.id}`) {
//     return all_quizes;
//   } else if (
//     props.match.url === `/quizes/your-quizes/${props.match.params.id}`
//   ) {
//     return your_quizes.map((qui, indexQui) => [
//       qui.quizQuestions.map((que, indexQue) => ({
//         title: qui.quizTitle,
//         description: qui.quizDescription,
//         category: qui.quizCategory,
//         type: qui.quizType,
//         difficulty: qui.quizDifficulty,
//         question: que.question,
//         correct_answer: que.correct_answer,
//         incorrect_answers: que.incorrect_answers
//       }))
//     ]);
//   } else if (
//     props.match.url === `/quizes/travias-quizes/${props.match.params.id}`
//   ) {
//     return quizes;
//   }
// };
