import React, { useState, useContext, useEffect } from "react";
import Question from "./Question/Question";
import QuizContext from "../../../context/quiz/quizContext";

const QuizPage = props => {
  const quizContext = useContext(QuizContext);
  const { quizes, getQuizes } = quizContext;

  useEffect(() => {
    if (quizes === null) {
      props.history.push("/quizes");
    } else {
      setCorrectAnswers(
        quizes[props.match.params.id].map(que => {
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
  const [countdown, setCountdown] = useState(6000);
  const [disabledTwoOff, setDisabledTwoOff] = useState(false);
  const [disabledTime, setDisabledTime] = useState(false);
  const [ans, setAns] = useState([]);

  let quiz = null;
  let answersArray = null;
  if (quizes === null && answersArray === null) {
    props.history.push("/quizes");
  } else {
    quiz = quizes[props.match.params.id];
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
    quiz = quizes[props.match.params.id];
    answersArray = [
      quiz[question].incorrect_answers[
        Math.floor(Math.random() * quiz[question].incorrect_answers.length)
      ],
      quiz[question].correct_answer
    ];
    setAns(answersArray);
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

  return quizes ? (
    <div className="section__quizpage">
      <div className="section__information">
        <div className="section__information-countdown">{countdown}</div>
      </div>
      <div className="section__question">{quiz[question].question}</div>
      <div className="section__answers">
        {ans.length > 1
          ? ans.map((answerArray, index) => (
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
            ))
          : answersArray.map((answerArray, index) => (
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
            ))}
      </div>
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
            <i class="fas fa-hands-helping"></i> 2 OUT
          </button>
          <button
            className={`jokers__time ${disabledTime ? "disabled" : ""}`}
            disabled={disabledTime}
            onClick={() => {
              setCountdown(countdown + 15);
              setDisabledTime(true);
            }}
          >
            <i class="far fa-clock"></i> +15
          </button>
        </div>
        <div className="options">
          <div className="section__buttons-finish">
            <i class="fas fa-times-circle"></i> FINISH
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
                setAns([]);
              }
            }}
          >
            <i class="fas fa-arrow-circle-right"></i> NEXT
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default QuizPage;
